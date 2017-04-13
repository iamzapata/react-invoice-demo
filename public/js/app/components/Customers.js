class Customers extends React.Component {

	constructor() {
		super();
		this.state = {
			customers: []
		}
	}

	componentDidMount() {
		$.get('/api/customers', (customers) => {
			this.setState({customers});
		});
	}

	render() {	

		const { customers } = this.state;


		return (
			<div>
				<h2>Customers</h2>

				<table className="table table-striped table-condensed"> 
					<thead> 
						<tr> 
							<th>#</th> 			
							<th>name</th> 
							<th>phone</th> 
							<th>address</th> 						
						</tr> 
					</thead> 
					<tbody> 
						{
							customers.map(c => (
								<tr>
									<td>{c.id}</td>
									<td>{c.name}</td>
									<td>{c.phone}</td>
									<td>{c.address}</td>						
									<td>{moment(c.createdAt).format('llll')}</td>
									<td>{moment(c.updatedAt).format('llll')}</td>
								</tr>
							))
						} 
					</tbody> 
				</table>
			</div>
		);
	}
	
}