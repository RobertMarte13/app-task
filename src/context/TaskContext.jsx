import { createContext, useState } from "react";
import { supabase } from "../supabase/supabase";

export const TaskContext = createContext();

// eslint-disable-next-line react/prop-types
export const TaskConstextProvaider = ({ children }) => {
  const [tasks, setTask] = useState([]);

  const [userId, setUserId] = useState(async () => {
    try {
      const data = await supabase.auth.getUser();
      const { id } = data.data.user;

      return setUserId(id);
    } catch (error) {
      console.log(error);
    }
  });

  const getTasks = async (done=false) => {
    // ? Este me esta ayudando a identificar si es un 200 o 400 la respuesta.
    const { status } = await supabase
      .from("task")
      .select()
      .eq("userid", userId);

    // ? Lsos metodos que se estan usando aqui son:
    // ? from() que es para identificar la columna o tabla que queremos modificar.
    // ? select() Este metodo sirve para seleccionar todos los elementos de una tabla.
    // ? eq() Este metodo resive dentro el id o nombre del objeto que queremos identificar y este tiene que ser igual al que le estamos indicando en el segundo parametro.
    // ? order() Este metodo lo que hace es ordenar de forma que le digamos:
    // * Dentro este resive dos parametros, el primero es el id, y luego en el segundo parametro resive un objeto que lo que hace dentro es escribir la forma en la que queremos que se vean los elemento.
    if (status === 200) {
      const { error, data } = await supabase
        .from("task")
        .select()
        .eq("userid", userId)
        .eq("done", done)
        .order("id", { ascending: true });

      if (error) throw Error;

      setTask(data);
    }
  };

  const createTasks = async (taskName) => {
    try {
      // * Importante acordarme que se debe poner un await
      // ? Este equivale al post de fetch,solo que aqui lo que hacemos
      // ? es seleccionar la tabla task y luego insertar un objeto
      // ? con el dato del estado.
      await supabase.from("task").insert({
        name: taskName,
        userid: userId,
      });

      setTask([...tasks]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTasks = async (id) => {
    await supabase.from("task").delete().eq("userid", userId).eq("id", id);
  };

  const updateTasks = async (id, updateTask) => {
    const result = await supabase
      .from("task")
      .update(updateTask)
      .eq("userid", userId)
      .eq("id", id);

    console.log(result);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, getTasks, createTasks, deleteTasks, updateTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};
