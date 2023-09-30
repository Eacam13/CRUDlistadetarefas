import React, { Component } from "react"
import './styles.css'
import { FaPenSquare, FaWindowClose } from 'react-icons/fa'

export default class Main extends Component {

    state = {
        novaTarefa: '',
        tarefas: [],
        index: -1
    }

    componentDidMount(){
        let tarefas = JSON.parse(localStorage.getItem('tarefas'));
        if(!tarefas) return;
        this.setState({tarefas});
    }
    componentDidUpdate(prevProps,prevState){
        let {tarefas} = this.state;
        if (tarefas === prevState.tarefas) return;
        localStorage.setItem('tarefas',JSON.stringify(tarefas))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { tarefas, index } = this.state; //variável de estado
        let { novaTarefa } = this.state; //valor q vem do form
        novaTarefa = novaTarefa.trim();//atribui o que vem do input sem espaços

        if (tarefas.indexOf(novaTarefa) !== -1) return; //verifica se a tarefa já 
        //existe para não repetir

        const novasTarefas = [...tarefas] //variável recebe o array de tarefas(...copia) 
        //pq não ppde mudar o estado diretamente

        if (index === -1) { //então é uma nova tarefa CRIAR
            this.setState({
                tarefas: [...novasTarefas, novaTarefa], //estado recebe nova tarefa
                novaTarefa: '', //limpa o input
            })
        } else {//então é uma tarefa já existente EDITAR
            novasTarefas[index] = novaTarefa //muda o valor da tarefa nesse índice

            this.setState({
                tarefas: [...novasTarefas], //estado recebe a cópia das tarefas atualizadas
                index: -1,//aponta q já editou e atualiza para -1
            })

        }
        console.log(novaTarefa)

    }

    handleChange = (e) => {
        this.setState({
            novaTarefa: e.target.value,
        });
    }

    handleEdit = (e, index) => {
        //console.log('Edit', index)
        const { tarefas } = this.state;//pega todas as tarefas
        this.setState({
            index, //passa o índice q é !==-1
            novaTarefa: tarefas[index], //busca no array tarefas a tarefa q tem esse índice 
            //e coloca no input a tarefa q foi selecionada
        });
    }

    handleDelete = (e, index) => {
        //console.log('Delete', index)
        const { tarefas } = this.state; //seta o estado de tarefas
        const novasTarefas = [...tarefas]; //copia as tarefas no array novasTarefas
        novasTarefas.splice(index, 1); //atualiza 1 item com esse índice

        this.setState({
            tarefas: [...novasTarefas] //devolve a cópia para o estado
        });
    }

    render() {
        const { novaTarefa, tarefas } = this.state
        return (
            <div className="container">
                <form
                    className="form"
                    onSubmit={this.handleSubmit}
                >
                    <h2 className="title">CRUD - lista de tarefas com React</h2>
                    <div className="areaInput">
                        <input type="text" className="inputTask" onChange={this.handleChange} value={novaTarefa} />
                        <button type="submit" className="btn">+</button>
                    </div>

                </form>
                <div className="listaTarefas">
                    {tarefas.map((tarefa, index) => {
                        return (
                            <ul className="areaTasks">
                                <p className="task" key={tarefa}>
                                    {tarefa}
                                </p>
                                <div className="btns">
                                    <button
                                        className="btnEdit"
                                        onClick={(e) => this.handleEdit(e, index)}
                                    >
                                        <FaPenSquare className="iconEdit" />
                                    </button>
                                    <button
                                        className="btnExcluir"
                                        onClick={(e) => this.handleDelete(e, index)}
                                    >
                                        <FaWindowClose className="iconExcluir" />
                                    </button>
                                </div>
                            </ul>
                        )
                    })}

                </div>
            </div>
        )
    }
}