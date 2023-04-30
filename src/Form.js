import { useState } from "react";

export default function (props) {
    const filterLabes = {
        pos: 'Населений пункт',
        objtype: "Об'єкт",
        old_name: 'Стара назва',
        new_name: 'Нова назва'
    }

    const [filter, setFilter] = useState({
        pos: '',
        objtype: '',
        old_name: '',
        new_name: ''
    });

    return (
<div className="container-sm" id="streets-form">
    {Object.keys(filter).map( key => (
        <div className="mb-3" key={key}>
            <label htmlFor={key} className="form-label">{ filterLabes[key] }</label>
            <input type="text" className="form-control" id={key} name={key}/>
        </div>
    )) }
</div>
    );
}
