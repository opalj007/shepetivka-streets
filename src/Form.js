import { useState, useEffect } from "react";

export default function (props) {
    const [dicts, setDicts] = useState({
        pos: [{pos: ''}],
        objtype: [{objtype: ''}]
    });

    useEffect( () => {
        Object.keys(dicts).map( field => {
            const unique = [...new Set(props.data.map( row => row[field]))];
            const records = unique.map( item => {
                const obj = {};
                obj[field] = item;
                return obj;
            });
            setDicts( previousState => {
                previousState[field] = [...previousState[field], ...records];
                return { ...previousState };
            });
        });
    }, []);

    const [filter, setFilter] = useState({
        pos: 'м. Шепетівка',
        objtype: 'вулиця',
        old_name: '',
        new_name: ''
    });
    const filterLabels = {
        pos: 'Населений пункт',
        objtype: "Об'єкт",
        old_name: 'Стара назва',
        new_name: 'Нова назва'
    }

    function performFilter( {target} ) {
        const name = target.getAttribute('id');
        setFilter( previousState => {
            previousState[name] = target.value;
            return { ...previousState };
        });
    }

    const [filtered, setFiltered] = useState([]);

    useEffect( () => {
        setFiltered(props.data.filter( row => {
            let visible = true;
            Object.keys(filter).forEach( key => {
                if (filter[key]) visible = visible && row[key].toLowerCase().includes(filter[key].toLowerCase());
            });
            return visible;
        }));
    }, [filter]);

    function showFilteredData() {
        return (filter.old_name.length > 3) || (filter.new_name.length > 3) ? filtered.map( item => ({
            id: filtered.indexOf(item).toString(),
            text: item.pos + ': ' + item.objtype + ' ' + item.old_name + ' -> ' + item.new_name
        })) : [];
    }

    return (
<div className="container-sm" id="streets-form">
    { ['pos', 'objtype'].map( key =>(
        <div className="pt-2" key={key}>
            <div>
                <label htmlFor={key}>{ filterLabels[key] }</label>
                <select className="form-select form-select-lg mb-3" id={key} value={filter[key]} onChange={performFilter}>
                { dicts[key].map( row => (
                    <option key={key + '-' + row[key]} value={row[key]}>{ row[key] }</option>
                )) }
                </select>
            </div>
        </div>
    )) }

    { ['old_name', 'new_name'].map( key => (
        <div className="pt-2" key={key}>
            <div>
                <label htmlFor={key} className="form-label">{ filterLabels[key] }</label>
                <input type="text" className="form-control" id={key} name={key} value={filter[key]} onChange={performFilter}/>
            </div>
        </div>
    )) }
    { showFilteredData().length > 0 && (<h6 className="mt-3">Знайдено</h6>)}
    <ul className="list-group py-3">
    { showFilteredData().map( row => (
        <li key={row.id} className="list-group-item">{ row.text }</li>
    )) }
    </ul>
</div>
    );
}
