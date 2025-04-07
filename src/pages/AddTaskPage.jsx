import { useMemo, useRef, useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"

export default function AddTaskPage() {

    const { addTask } = useGlobalContext()
    const [input, setInput] = useState('')
    const descriptionRef = useRef('')
    const statusRef = useRef('')

    const symbols = "!@#$%^&*()-_=+[]{}|;:',\".<>?/`~";

    const checkInput = useMemo(() => {
        if (input.trim() === '')
            return "Il nome della task non può essere vuoto."
        if ([...input].some(i => symbols.includes(i)))
            return "Il nome della task non può contenere simboli."
        return ''
    }, [input])

    const handleSubmit = e => {
        e.preventDefault();

        if (!checkInput) {
            addTask(input, descriptionRef.current?.value, statusRef.current?.value)
            setInput('')
            descriptionRef.current.value = ''
            statusRef.current.value = 'To do'
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Nome Task</label>
                <input value={input} onChange={(e) => setInput(e.target.value)} />
                {checkInput && <p style={{ color: 'red' }}>{checkInput}</p>}
                <label htmlFor="">Descrizione</label>
                <input ref={descriptionRef} />
                <select ref={statusRef}>
                    <option value={"To do"} defaultValue={'To do'}>To do</option>
                    <option value={"Doing"}>Doing</option>
                    <option value={"Done"}>Done</option>
                </select>
                <button type="submit">Aggiungi Task</button>
            </form>
        </>
    )
}