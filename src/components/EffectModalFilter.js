import React from 'react';

import './EffectModalFilter.css';


/*-- Effect Modal + text --*/
const Modal = (props) => {
	return (
	
			<div className="modal-wrapper"
				style={{
					transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
					opacity: props.show ? '1' : '0'
				}}>
					<div className="lulu">	{props.children}</div>
					
					
			</div>
	
	)
}

export default Modal;