import { useState, useEffect } from "react";

export default function (props) {
    const [dicts, setDicts] = useState({
        pos: [],
        objtype: [],
        old_name: [],
        new_name: []
    });

    useEffect( () => {
        fetchData('pos', '/json/settlements');
        fetchData('objtype', '/json/object-types');
        fetchData('old_name', '/json/old-names');
        fetchData('new_name', '/json/new-names');
    }, []);

    async function fetchData(dict, url) {
        try {
            const response = await fetch(url);
            const records = await response.json();
            records.unshift({pos: ''});
            setDicts( previousState => {
                previousState[dict] = records;
                return { ...previousState };
            });
        } catch (err) {
            console.error(err);
            alert('Виникла помилка!');
        }
    }

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
            // return previousState; - this doesn't work
            return { ...previousState }; // this works
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

    function extractFilteredData(attr) {
        return (filter.old_name.length > 3) || (filter.new_name.length > 3) ? filtered.map( item => ({
            id: attr + '-' + filtered.indexOf(item).toString(),
            field: item[attr]
        })) : [];
    }

    return (
<div className="container-sm" id="streets-form">
    { ['pos', 'objtype'].map( key =>(
        <div className="py-3" key={key}>
            <div>
                <label htmlFor={key}>{ filterLabels[key] }</label>
                <select className="form-select form-select-lg mb-3" id={key} value={filter[key]} onChange={performFilter}>
                { dicts[key].map( row => (
                    <option key={key + '-' + row[key]} value={row[key]}>{ row[key] }</option>
                )) }
                </select>
            </div>
            <ul className="list-group">
                { ! filter[key] && extractFilteredData(key).map( row => (
                    <li key={row.id} className="list-group-item">{ row.field }</li>
                    )) }
            </ul>
        </div>
    )) }

    { ['old_name', 'new_name'].map( key => (
        <div className="pt-3" key={key}>
            <div>
                <label htmlFor={key} className="form-label">{ filterLabels[key] }</label>
                <input type="text" className="form-control" id={key} name={key} value={filter[key]} onChange={performFilter}/>
            </div>
            <ul className="list-group">
                { extractFilteredData(key).map( row => (
                    <li key={row.id} className="list-group-item">{ row.field }</li>
                )) }
            </ul>
        </div>
    )) }
    <div>&nbsp;</div>
</div>
    );
}
