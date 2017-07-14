import React from 'react'

const ErrorHelper = ({errors, type}) => {
	return errors[type] ?  (
		<span className="errors">
				{errors[type].map((v, i) => {
					return (<span key={i} className="help-block">{v}</span>)
				})}
			</span>
	) : null;
};

export default ErrorHelper;