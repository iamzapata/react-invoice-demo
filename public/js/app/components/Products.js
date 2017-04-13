
class Products extends React.Component {

	constructor() {
		super();
		this.state = {
			products: []
		}
	}

	componentDidMount() {
		$.get('/api/products', (products) => {
			this.setState({products});
		});
	}

	render() {	

		const { products } = this.state;

		return (
			<div>
				<h2>Products</h2>

				<table className="table table-striped table-condensed"> 
					<thead> 
						<tr> 
							<th>#</th> 			
							<th>Name</th> 
							<th>Price</th> 
							<th>Created At</th> 
							<th>Updated At</th> 
						</tr> 
					</thead> 
					<tbody> 
						{
							products.map(p => (
								<tr>
									<td>{p.id}</td>
									<td>{p.name}</td>
									<td>{p.price}</td>
									<td>{moment(p.createdAt).format('llll')}</td>
									<td>{moment(p.updatedAt).format('llll')}</td>
								</tr>
							))
						} 
					</tbody> 
				</table>
			</div>
		);
	}
	
}