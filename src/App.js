import { useState, useEffect } from "react";
import StreetTable from "./StreetTable";
import Form from "./Form";

export default function () {
    const modesToShow = {
        table: 'Форма',
        form: 'Таблиця'
    }
    const initialMode  = window.innerWidth > 1080 ? 'table' : 'form';
    // const initialMode = 'form';
    const [mode, setMode] = useState(initialMode);
    const [data, setData] = useState([]);
    const [dicts, setDicts] = useState({
        pos: [{pos: ''}],
        objtype: [{objtype: ''}]
    });

    useEffect( () => {
        (async () => {
            try {
                const response = await fetch('/streets.json');
                const records = await response.json();
                setData(records);
                Object.keys(dicts).map( field => {
                    const unique = [...new Set(records.map( row => row[field]))];
                    const dict_records = unique.map( item => {
                        const obj = {};
                        obj[field] = item;
                        return obj;
                    });
                    setDicts( previousState => {
                        previousState[field] = [...previousState[field], ...dict_records];
                        return { ...previousState };
                    });
                });
            } catch (err) {
                console.error(err);
                alert('Виникла помилка!');
            }
        })();
    }, []);

    const toggleMode = () => {
        setMode( prevMode => {
            return prevMode === 'table' ? 'form' : 'table';
        })
    }

    return (
        <>
<h1>Перейменовані топонімічні об'єкти <button type="button" className="btn btn-primary" onClick={toggleMode}>{ modesToShow[mode] }</button></h1>
{ mode === 'table' ? <StreetTable data={ data } /> : <Form data={ data } dicts={ dicts } /> }
        </>
    );
}
