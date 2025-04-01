import { useMemo, useRef, useState } from "react"
import { useGlobalContext } from "../context/GlobalContext"

export default function AddTaskPage() {

    const { addTask } = useGlobalContext()
    const [input, setInput] = useState('')
    const descriptionRef = useRef('')
    const statusRef = useRef('')

    const symbols = "!@#$%^&*()-_=+[]{}|;:',\".<>?/`~";

    const checkInput = useMemo(() => {
        if (input === '') {
            return false
        } else {
            [...input].some(i => {
                if (symbols.includes(i)) {
                    return false
                }
            })
        }
        return true
    }, [input])

    const handleSubmit = e => {
        e.preventDefault();

        if (checkInput) {
            addTask(input, descriptionRef.current?.value, statusRef.current?.value)
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">Nome Task</label>
                <input value={input} onChange={(e) => setInput(e.target.value)} />
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