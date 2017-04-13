const InvoicesList = ({invoices}) => {
	return (
		<table className="table table-striped table-condensed"> 
			<thead> 
				<tr> 
					<th>#</th> 			
					<th>Customer Id</th> 
					<th>Discount</th> 
					<th>Total</th> 						
				</tr> 
			</thead> 
			<tbody> 
				{
					invoices.map( i => (
						<tr>
							<td>{i.id}</td>
							<td>{i.customer_id}</td>
							<td>{i.discount}</td>
							<td>{i.total}</td>						
						</tr>
					))
				} 
			</tbody> 
		</table>
	)
}


InvoicesList.propTypes = {
	invoices: React.PropTypes.array
}