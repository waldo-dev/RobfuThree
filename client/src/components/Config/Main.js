import React from 'react';
import axios from 'axios';
import jQuery from 'jquery';
import HeaderComponent from './Header';
import SideComponent from './Side';
import CanvasComponent from './Canvas';
import BottomComponent from './Bottom';
import LoadingComponent from './Loading';
import { sideW, canvasH, contentW, stepArr, posArr } from '../common/info';
import imgExit from '../../images/exit.png';

import '../../styles/config/index.css';

const skipTest = false, projectName = 'Nombre del proyecto';

export default class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		this.stayTime = -1;
		this.state = {pageKey:'canvas', selStep:stepArr[0].key, loadPro: 0, selRoom:'', selSize:{w:4.5, h:2.2, d:3}, selPos:posArr[0].key };
	}

	componentDidMount() {
		this.setState({loading:true, loadPro:0});
	}

	setLoadPro = (loadPro) => {
		this.setState({loadPro}, () => {
			if (loadPro < 100) return;
			setTimeout(() => { this.setState({loading:false}); }, 1000);
			setTimeout(() => { this.setState({loadPro:undefined}); }, 2000);
		});
	}

	render() {
		const {pageKey, selStep, loadPro, loading, selRoom, selSize, selPos, addKey} = this.state;
		return (
			<div className={`config-page ${pageKey}-page ${selStep}-step`}>
				<HeaderComponent
					selStep={selStep}
					setSelStep={(selStep)=> this.setState({selStep})}
				></HeaderComponent>
				<div className='content-wrapper flex'>
					<div className='content' style={{width:contentW+'px'}}>
						<div className='main-content flex' style={{height:canvasH+'px'}}>
							<SideComponent
								selStep={selStep}
								selRoom={selRoom}
								selSize={selSize}
								selPos={selPos}
								setSelSize={(selSize)=>this.setState({selSize})}
								setSelRoom={(selRoom)=>this.setState({selRoom, selStep:stepArr[1].key})} // , () => this.setState({})
								setStepCabinet={()=>this.setState({selStep:stepArr[2].key})}
							></SideComponent>
							<CanvasComponent
								pageKey={pageKey}
								selRoom={selRoom}
								selStep={selStep}
								loading={loading}
								selSize={selSize}
								selPos={selPos}
								addKey={addKey}
								setLoading={(loading, loadPro)=>this.setState({loading, loadPro})}
								deleteAddKey={()=>this.setState({addKey:null})}
							></CanvasComponent>
						</div>
						<BottomComponent
							selStep={selStep}
							selPos={selPos}
							addCabinet={(addKey)=>this.setState({addKey})}
						></BottomComponent>
						<div className='other-info flex'>
							<div className='project-name'>{projectName}</div>
							<div className='keep flex'>
								<img src={imgExit}></img>
								<label>Guardar</label>
							</div>
						</div>
					</div>
				</div>
				<LoadingComponent
					pageKey={pageKey}
					loading={loading}
					loadPro={loadPro}
				></LoadingComponent>
			</div>
		);
	}
}
