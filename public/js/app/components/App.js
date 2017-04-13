class App extends React.Component {

	constructor() {
		super();

		this.state = {
			invoice: null, 
			discount: 0,	
			invoices: [],
			customers: [],
			products: [],
			selectedCustomer: null,
			selectedProduct: null,
			newInvoice: false
		}

		this.updateInvoice = this.updateInvoice.bind(this);
		this.invoiceAddItem = this.invoiceAddItem.bind(this);
		this.createNewInvoice = this.createNewInvoice.bind(this);
		this.onChangeSingleItemQty = this.onChangeSingleItemQty.bind(this);
		this.updateProductSelection = this.updateProductSelection.bind(this);
		this.updateCustomerSelection = this.updateCustomerSelection.bind(this);
	}

	componentDidMount() {

		$.get('/api/invoices', (invoices) => {
			this.setState({invoices});
		});

		$.get('/api/customers', (customers) => {
			this.setState({customers});
		});

		$.get('/api/products', (products) => {
			this.setState({products});
		});
	}

	updateCustomerSelection(selectedCustomer) {
		const { customers } = this.state;
		const customer = customers.find(c => c.id == selectedCustomer);
		this.setState({selectedCustomer: customer});

	};

	updateProductSelection(selectedProduct) {
		const { products } = this.state;
		const product = products.find(p => p.id == selectedProduct);
		this.setState({selectedProduct: product});
	}

	updateInvoice() {
		console.log('Form Updated');
	};

	createNewInvoice() {
		this.setState({newInvoice: true})
	};

	invoiceAddItem(item) {
		const { invoice } = this.state;
		let invoices = invoice ? invoice.invoices : [];

		const existingInvoice = invoices.find(i => i.id == item.id);

		invoices = invoices.map(i => {
			if(i.id == item.id) {
				return {
					...i,
					qty: parseInt(i.qty) + parseInt(item.qty)
				}
			}
			return i;
		});

		this.setState({
			invoice: {
				...invoice,
				invoices: existingInvoice ? [...invoices] : [...invoices, item]
			}
		});
	}

	onChangeSingleItemQty(ev, item) {
		const { value } = ev.target;
		const { invoice } = this.state;

		if(value <= 0)
			return;

		const updateInvoices = invoice.invoices.map(i => {
			if(i.id == item.id) {			
				return {
					...item,
					qty: value
				}
			}
			return i;
		})

		this.setState({
			invoice: {
				...invoice,
				invoices: updateInvoices
			}
		})

	}

	onChangeOrderDiscount(ev) {
		const { value: discount } = ev.target;

		if(discount > 50 || discount < 0) 
			return;

		this.setState({discount});
	}

	computeSubTotal() {
		const { invoices } = this.state.invoice;

		if(!invoices.length)
			return 0;

		const total = invoices.map(i => parseFloat(i.qty) * parseFloat(i.price))

		               .reduce((prev, next) => prev + next, 0);		             

		return parseFloat(total.toFixed(2));

	}

	computeGrandTotal() {
		const subTotal = this.computeSubTotal();
		const { discount } = this.state;

		if(!discount)
			return subTotal;

		const grandTotal = subTotal - subTotal * discount / 100
	
		return parseFloat(grandTotal.toFixed(2));

	}


	render() {

		const { location } = this.props;

		const { 
			invoice,
			invoices, 
			customers, 
			products, 
			selectedCustomer,
			selectedProduct,
			newInvoice,
			discount	
		} = this.state;

		const isHome = location.pathname === '/' ? true : false;
		
		const hasInvoices = invoices.length ? true : false;

		const subTotal = invoice ? this.computeSubTotal() : 0;

		const grandTotal = invoice ? this.computeGrandTotal() : 0;

		const showDiscount = discount ? (<span> {discount} <i className="fa fa-percent" aria-hidden="true"/> </span>): 0;

		return (
		 <div>
		 	<Header/>

		 	{
		 		isHome &&

			 	<div className="container">

				 	<button 
				 		type="button" 
				 		className="btn btn-default NewInvoice"
				 		onClick={() => this.createNewInvoice()}
				 	>
				 		Create New Invoice
				 	</button>

				 	{
				
						newInvoice && 

				 		<div>
				 			<InvoiceForm 
					 			products={products}
					 			customers={customers} 				 	
					 			selectedProduct={selectedProduct}
					 			selectedCustomer={selectedCustomer}				 	

					 			updateInvoice={this.updateInvoice}
					 			invoiceAddItem={this.invoiceAddItem}
					 			updateProductSelection={this.updateProductSelection}
					 			updateCustomerSelection={this.updateCustomerSelection}				
					 		/>

					 		<div className="Invoice">
					 		    <h2> <strong>Invoice: </strong> {invoice ? invoice.id : '###'} </h2>
					 			<h3> <strong>Client: </strong> {selectedCustomer ? selectedCustomer.name: 'N/A'}</h3>
					 			<table className="table table-bordered"> 
						 			<thead> 
							 			<tr> 								 		
								 			<th>Name</th> 
								 			<th>Quantity</th> 
								 			<th>Price</th> 
								 			<th>Total</th>
							 			</tr> 
						 			</thead> 
						 			<tbody> 
					 					{
					 						invoice &&
					 						invoice.invoices.map(i => {
					 							const total = parseFloat(i.qty) * parseFloat(i.price)
					 							return (
						 							<tr>  					 							
						 								<td>{i.name}</td>
						 								<td>					 								
						 									<input type="number" className="form-control" value={i.qty} onChange={(ev) => this.onChangeSingleItemQty(ev, i)}/>
						 								</td>
						 								<td>{i.price}</td>
						 								<td>{parseFloat(total.toFixed(2))}</td>
						 							</tr>
					 							);
					 						})
					 					}
						 			</tbody> 
					 			</table>
					 			<div className="InvoiceFooter">
						 			<h1 className="Discount"> 
							 			<strong>Discount: </strong>
							 			<input type="number" className="form-control" value={discount} onChange={(ev) => this.onChangeOrderDiscount(ev)}/>									
							 			<strong><i className="fa fa-percent" aria-hidden="true"/></strong>
						 			</h1>
						 			<div className="Totals">
										<h1 className="SubTotal"> 
											<strong>Sub Total: </strong>
											<span> $ {subTotal}</span>
										</h1>
										<h1 className="MinusDiscount"> 
											<strong>(-) Discount: </strong>
											<span> {showDiscount}</span>
										</h1>
										<h1 className="GrandTotal"> 
											<strong>Grand Total: </strong>
											<span> $ {grandTotal}</span>
										</h1>
						 			</div>
					 			</div>
					 		</div>

				 		</div>				 	

				 	}

				 	{
				 		hasInvoices && 		
				 		<InvoicesList invoices={invoices}/>
				 	}

				 	{
				 		!hasInvoices && 		
				 		<small>No Invoices Saved Yet</small>
				 	}
			 	</div>
		 	}

		 	<div className="container">
		 		{this.props.children}
		 	</div>

		 </div>

		);
	}
}