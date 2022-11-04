import { useEffect, useState } from 'react'
import { Card, CardContent, Typography, Button } from '@mui/material'
import {useNavigate} from 'react-router-dom'

export default function TaskList() {

        const [tasks, setTasks] = useState([]);

        const navigate = useNavigate ();

        const loadTasks = async () => {
                const response = await fetch('https://apis-nodejs.herokuapp.com/tasks')
                const data = await response.json()

                /*console.log(data); */

                setTasks(data);

        };

        const handleDelete = async (id) => {
                try {
                        await fetch(`https://apis-nodejs.herokuapp.com/tasks/${id}`, {
                                method: "DELETE",
                        });
                        setTasks(tasks.filter((task) => task.id !== id));
                } catch (error) {
                        console.error(error);
                }
        };

        useEffect(() => {
                loadTasks();

        }, []);

        return (
                <>
                        <h1>Task list</h1>
                        {
                                tasks.map((task) => (
                                        <Card style={{
                                                marginBottom: ".7rem",
                                                backgroundColor: '#3f51b5'
                                        }}

                                                key={task.id}
                                        >
                                                <CardContent style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between'

                                                }}>
                                                        <div style={{ color: 'white' }}>
                                                                <Typography>{task.title}</Typography>
                                                                <Typography>{task.description}</Typography>
                                                                <Typography>{task.status}</Typography>
                                                        </div>



                                                        <div>
                                                                <Button variant='contained' color='inherit' onClick={() => navigate ('/tasks/${task.id}/edit') }>
                                                                        Editar
                                                                </Button>
                                                                <Button variant='contained' color='warning' onClick={() => handleDelete(task.id)} style={{ marginLeft: ".5rem" }}>

                                                                        Eliminar
                                                                </Button>
                                                        </div>




                                                </CardContent>
                                        </Card>

                                ))}

                </>

        )
}