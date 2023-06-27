import { useContext } from "react"
import { TaskContext } from "../context/TaskContext"

export const useTask = () => {
    const context = useContext(TaskContext)
    if(!context) throw new Error('Debes envolver con el TaskContextProvaider los componentes los cuales quires que tenga unas propiedades globales.')
    return context
}