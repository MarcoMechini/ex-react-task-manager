import { useMemo, useRef, useState } from "react"

export default function AddTaskPage() {

    const [input, setInput] = useState('')
    const descriptionRef = useRef('')
    const statusRef = useRef('')

    const symbols = "!@#$%^&*()-_=+[]{}|;:',\".<>?/`~";

    const checkInput = useMemo(() => {
        if (input === '') {
            console.log('input non valido');
        } else {
            [...input].forEach(i => {
                if (symbols.includes(i)) {
                    console.log('input non valido');
                }
            })
        }
    }, [input])



    //validazione con useMemo() 
    // MILESTONE 5.2
    return (
        <>
            <form>
                <label htmlFor="">Nome Task</label>
                <input value={input} onChange={(e) => setInput(e.target.value)} />
                <label htmlFor="">Descrizione</label>
                <input ref={descriptionRef} />
                <select ref={statusRef}>
                    <option value={"To do"} defaultValue={'To do'}>To do</option>
                    <option value={"Doing"}>Doing</option>
                    <option value={"Done"}>Done</option>
                </select>
            </form>
        </>
    )
}