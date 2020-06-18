import React, { Component } from 'react'
import axios from 'axios'
import './Hospitales.css';
import icon_delete from '../../assets/icons/delete.svg'
import icon_edit from '../../assets/icons/edit.svg'

export default class Hospitales extends Component {

    state = {
        hospitales: [],
        provincias: [],
        _id:'',
        nombreHospital: '',
        direccionHospital: '',
        localidadHospital: '',
        provinciaHospital: '',
        update: false
    };

    async componentDidMount(){
        await this.getHospitales()
        await this.getProvincias()
        console.log(this.state.hospitales)
    }

    getHospitales = async () => { 
        const res = await axios.get('http://localhost:8000/api/hospital/')
        this.setState({hospitales: res.data })
    }

    getProvincias = async () => {
        const res = await axios.get('http://localhost:8000/api/provincia/')
        this.setState({provincias: res.data })
    }

    setDatos = () => {
        this.setState({
            _id: '',
            nombreHospital: '',
            direccionHospital: '',
            localidadHospital: '',
            provinciaHospital: '',
            update: false
        })
    }

    onChangeNombreHospital = (e) => {
        this.setState({
            nombreHospital: e.target.value
        })
        console.log('Nombre Hospital: ',this.state.nombreHospital)
    }

    onChangeDireccionHospital = (e) => {
        this.setState({
            direccionHospital: e.target.value
        })
        console.log('Direccion Hospital: ',this.state.direccionHospital)
    }
    onChangeLocalidadHospital = (e) => {
        this.setState({
            localidadHospital: e.target.value
        })
        console.log('Nombre Localidad: ',this.state.localidadHospital)
    }

    onChangeProvinciaHospital = (e) => {
        this.setState({
            provinciaHospital: e.target.value
        })
        console.log('Nombre Provincia: ',this.state.provinciaHospital)
    }

    onSubmitSave = async (e) => {
        e.preventDefault();
        if(!this.state.update){
            const res = await axios.post('http://localhost:8000/api/hospital/', {
                nombre: this.state.nombreHospital,
                direccion: this.state.direccionHospital,
                localidad: this.state.localidadHospital,
                provincia: this.state.provinciaHospital
            })
            console.log(res)
        }else{
            const res = await axios.put('http://localhost:8000/api/hospital/'+this.state._id, {
            nombre: this.state.nombreHospital,
            direccion: this.state.direccionHospital,
            localidad: this.state.localidadHospital,
            provincia: this.state.provinciaHospital
            })
            console.log(res)
        }
        this.setDatos()
        this.getHospitales()
    }

    deleteHospital =  async(id) => {
        console.log('Hospital: ', id)
        const res = await axios.delete('http://localhost:8000/api/hospital/' + id)
        this.setDatos()
        console.log(res)
        this.getHospitales()
    }

    editHospital = async(id) => {
        console.log('Hospital: ', id)
        const res = await axios.get('http://localhost:8000/api/hospital/' + id)
        console.log(res)
        this.setState({
            update: true,
            _id: id,
            nombreHospital: res.data.nombre,
            direccionHospital: res.data.direccion,
            localidadHospital: res.data.localidad,
            provinciaHospital: res.data.provincia.nombre,
        })

    }

    render() {
        return (
            <div className="container p-4">
                <div className="row">
                    <div className="col-md-4">
                        {/* Create */}
                        <div className="card card-body">
                            { !this.state.update ? <h3>Crear Nuevo Hospital</h3> : <h3>Editar Hospital</h3> }
                            <form  onSubmit={this.onSubmitSave}> 
                                <div className="form-group">
                                    <input type="text" placeholder="Nombre Hospital" className="form-control" value={this.state.nombreHospital} onChange={this.onChangeNombreHospital}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Direccion" className="form-control" value={this.state.direccionHospital} onChange={this.onChangeDireccionHospital}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Localidad" className="form-control" value={this.state.localidadHospital} onChange={this.onChangeLocalidadHospital}/>
                                </div>
                                <div className="form-group">
                                    <input type="text" placeholder="Provincia" className="form-control" value={this.state.provinciaHospital} onChange={this.onChangeProvinciaHospital}/>
                                </div>
                                <div className="form-group">
                                    { !this.state.update ? <button className="btn btn-block btn-success">Guardar</button> : <button className="btn btn-block btn-primary">Actualizar</button> }
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <ul className="list-group">
                            {
                                this.state.hospitales.map(hospital => (
                                    <li className="list-group-item list-group-item-action" key={hospital.id}>
                                        <div className="row">
                                            <div className="col-md-9 col-8">
                                                { hospital.nombre }
                                            </div>
                                            <div className="col-md-3 col-4">
                                                <button className="btn btn-sm btn-secondary mr-1" onClick={() => this.editHospital(hospital.id)} title="Editar">
                                                    <img src={icon_edit} width="20px" height="auto" alt=""/>
                                                </button>
                                                <button className="btn btn-sm btn-danger" onClick={() => this.deleteHospital(hospital.id)} title="Eliminar">
                                                    <img src={icon_delete} width="20px" height="auto" alt=""/>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
