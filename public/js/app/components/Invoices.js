class Invoices extends React.Component {


	constructor() {
		super();
		this.state = {
			invoices: []
		}
	}

	componentDidMount() {
		$.get('/api/invoices', (invoices) => {
			this.setState({invoices});
		});
	}

	render() {	

		const { invoices } = this.state;

		const hasInvoices = invoices.length ? true : false;

		return (
			<div>
				<h2>Invoices</h2>

				{ 
					hasInvoices &&
					<InvoicesList invoices={invoices}/>
				}
				{
					!hasInvoices &&
					<small>No Invoices Saved Yet</small>
				}
			</div>
		);
	}
	
}