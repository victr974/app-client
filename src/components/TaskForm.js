import { Card, CardContent, Grid, TextField, Typography, Button, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

export default function TaskForm() {
        const [task, setTask] = useState({
                title: '',
                description: '',
                status: ''
        });
        const [loading, setLoading] = useState(false);
        const [editing, setEditing] = useState(false);

        const navigate = useNavigate();
        const params = useParams();


        const handleSubmit = async e => {
                e.preventDefault(); // cancelar el fresh que hace el form

                /* console.log('submit'); */

                /*console.log(task);*/

                setLoading(true)

                if (editing) {
                        console.log('update');
                        await fetch('https://apis-nodejs.herokuapp.com/tasks/${params.id}', {
                                method: 'PUT',
                                headers: {
                                        "Content-Type": "application/json",
                                },
                                body: JSON.stringify(task),
                        });

                }
                else {
                        await fetch('https://apis-nodejs.herokuapp.com/tasks', {
                                method: 'POST',
                                body: JSON.stringify(task),
                                headers: { "Content-Type": "application/json" },
                        });
                        /* const data = await res.json();*/
                        /* console.log(data)]*/
                }

                setLoading(false)
                navigate('/')
        }


        const handleChange = e => {

                /*  console.log(e.target.name, e.target.value);*/

                setTask({ ...task, [e.target.name]: e.target.value });


        };



        const loadTask = async (id) => {
                const res = await fetch('https://apis-nodejs.herokuapp.com/tasks/${id}')
                const data = await res.json();
                setTask({ title: data.title, description: data.description, status: data.status })
                setEditing(true);

        };

        useEffect(() => {
                if (params.id) {
                        loadTask(params.id);
                }
        }, [params.id]);




        return (

                <Grid container direction="colum" alignItems="center" justifyContent="center" >
                        <Grid item xs={3}>
                                <Card xs={{ mt: 5 }} style={{
                                        backgroundColor: '#1e272e',
                                        padding: '1rem'
                                }}>
                                        <Typography variant='5' textAlign='center' color='white' >Create task</Typography>
                                        <CardContent>
                                                <form onSubmit={handleSubmit}>
                                                        <TextField
                                                                variant='filled'
                                                                value={task.title}
                                                                placeholder='Write your title'
                                                                sx={{ display: 'block', margin: '.5rem 0' }}

                                                                name="title"
                                                                onChange={handleChange}

                                                                inputProps={{ style: { color: "white" } }}
                                                                inputLabel={{ style: { color: "white" } }}

                                                        />
                                                        <TextField
                                                                variant='filled'
                                                                value={task.description}
                                                                placeholder='Write your description'
                                                                multiline
                                                                rows={4}
                                                                sx={{ display: 'block', margin: '.5rem 0' }}

                                                                name="description"
                                                                onChange={handleChange}

                                                                inputProps={{ style: { color: "white" } }}
                                                                inputLabel={{ style: { color: "white" } }}


                                                        />

                                                        <TextField
                                                                variant='filled'
                                                                value={task.status}
                                                                placeholder='Write your status'
                                                                sx={{ display: 'block', margin: '.5rem 0' }}

                                                                name="status"
                                                                onChange={handleChange}

                                                                inputProps={{ style: { color: "white" } }}
                                                                inputLabel={{ style: { color: "white" } }}


                                                        />

                                                        <Button variant='contained' color='primary' type='submit' disabled={
                                                                !task.title || !task.description || !task.status
                                                        }>
                                                                {loading ? <CircularProgress

                                                                        color='inherit'
                                                                        size={24}
                                                                /> : 'Create'}
                                                        </Button>



                                                </form>

                                        </CardContent>
                                </Card>
                        </Grid>
                </Grid>

        );
};