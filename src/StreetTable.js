import { useState } from "react";

export default function (props) {
    const [filter, setFilter] = useState({
        pos: '',
        objtype: '',
        old_name: '',
        new_name: ''
    });

    function performFilter( {target} ) {
        const name = target.getAttribute('name');
        setFilter( previousState => {
            previousState[name] = target.value;
            // return previousState; - this doesn't work
            return { ...previousState }; // this works
        });
    }

    return (
        <table className="table table-striped" id="streets">
            <thead>
                <tr>
                    <th>Населений пункт</th>
                    <th>Об&apos;єкт</th>
                    <th>Стара назва</th>
                    <th>Нова назва</th>
                    <th>Дата зміни</th>
                    <th>Змінено в БД</th>
                </tr>
            </thead>
            <tbody>
                <tr className="table-primary" id="filter">
                    { Object.keys(filter).map( key => (
                        <td key={key}><input className="form-control" name={key} type="text" value={filter[key]} onChange={performFilter} /></td>
                    )) }
                    <td colSpan={2}></td>
                </tr>
                { props.data.filter( row => {
                    let visible = true;
                    Object.keys(filter).forEach( key => {
                        if (filter[key]) visible = visible && row[key].toLowerCase().includes(filter[key].toLowerCase());
                    });
                    return visible;
                }).map( row => (
                    <tr key={row.id} className="table-secondary">
                        <td> {row.pos} </td>
                        <td> {row.objtype} </td>
                        <td> {row.old_name} </td>
                        <td> {row.new_name} </td>
                        <td> {row.rename_date} </td>
                        <td> { row.applied ? 'Yes' : 'No' } </td>
                    </tr>
                )) }
            </tbody>
        </table>
    );
}
