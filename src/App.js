import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm'
import Control from './components/Control'
import TaskList from './components/TaskList'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
        tasks:[],// id, name, status
        filter:{
            name:'',
            status:-1
        },
        keyword:'',
        sort:{
            by:'',
            value:1
        }
    }
  } 
  componentWillMount(){
    if (localStorage && localStorage.getItem('tasks')){
        var tasks= JSON.parse(localStorage.getItem('tasks'));
        this.setState({
            tasks: tasks
        });
    }
  } 
  
  s4(){
     return (Math.floor((1+Math.random())* 0x10000).toString(16).substring(1));
  }
  generateID(){
    return (this.s4()+'-'+this.s4()+'-'+this.s4());
  }
  onSave = (data)=>{
       data.id = this.generateID();
       var {tasks}= this.state;
       tasks.push(data);
       this.setState({
            tasks:tasks,
            taskEditing:null
       });
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    findIndex=(id)=>{
        var {tasks}= this.state;
        var result=-1;
        tasks.forEach((task,index)=>{
            if (task.id===id)
            {
                result= index;
            }
        });
        return result;
    }
    onUpdateStatus = (id)=>{
        var {tasks}=  this.state;
        var index =  this.findIndex(id);
        if (index!==-1){
            tasks[index].status=!tasks[index].status;
        }
        this.setState({
            tasks:tasks
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    onDelete =(id)=>{
        var {tasks}= this.state;
        var index= this.findIndex(id);
        if (index!=-1)
        {
            tasks.splice(id,1);
        }
         this.setState({
            tasks:tasks
        });
        localStorage.setItem('tasks',JSON.stringify(tasks)); 
    }
    onUpdate=(id)=>{
        var {tasks}= this.state;
        var index= this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing: taskEditing
        });
        console.log(taskEditing);
    }
    onFilter=(filterName, filterStatus)=>{
        filterStatus = parseInt( filterStatus,10);
        this.setState({
            filter:{
                name: filterName,
                status: filterStatus
            }
        })
    }
     onSearch=(keyword)=>{
        this.setState({
            keyword:keyword
        })
    }
    onSort=(sortBy,sortValue)=>{
        this.setState({
            sort:{
                by: sortBy,
                value:sortValue
            }
        })
    }
  render() {
    var {tasks, taskEditing, filter, keyword,sort} = this.state;
    if (filter)
    {
        if (filter.name){
            tasks= tasks.filter((task)=>{
                return (task.name.toLowerCase().indexOf(filter.name.toLowerCase())!==-1);
            });
        }
        
             tasks= tasks.filter((task)=>{
                if (filter.status===-1){
                    return task;
                } else return (task.status===(filter.status===1?true:false));
            });
        
    }
    if (keyword)
    {
        tasks= tasks.filter((task)=>{
                return (task.name.toLowerCase().indexOf(keyword.toLowerCase())!==-1);
            });
    }
    if (sort.by==='name')
    {
        tasks.sort((a,b)=>{
            if (a.name>b.name) return sort.value;
            else if (a.name<b.name) return -sort.value;
            else return 0;
         });
    } else{
         tasks.sort((a,b)=>{
            if (a.status>b.status) return -sort.value;
            else if (a.status<b.status) return sort.value;
            else return 0;
         });
    }
    return (
        <div className="container mt-30">
            <div className="text-center">
                <h1> Quản lý công việc </h1>
                <hr/>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                     <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#AddJob"><i className="fas fa-plus"></i> &nbsp;Thêm công việc</button>

                   <TaskForm onSave= {this.onSave} task={taskEditing}/>
                   <Control 
                        onSearch={this.onSearch}
                        onSort={this.onSort}
                    />
                    <div className="row mt-15">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <TaskList 
                                tasks={tasks}  
                                onUpdateStatus={this.onUpdateStatus} 
                                onDelete={this.onDelete}
                                onUpdate={this.onUpdate}
                                onFilter={this.onFilter}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default App;
