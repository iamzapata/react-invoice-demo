class InvoiceForm extends React.Component {

	constructor() {
		super();
		this.state = {
			itemToAdd: null
		}
	}

	componentWillReceiveProps(nextProps) {
		const { selectedProduct: prevSelection } = this.props;
		let { selectedProduct } = nextProps;

		if(selectedProduct !== prevSelection) {
			this.setState({
				itemToAdd: {
					...selectedProduct,
					qty: 0
				}
			});
		}
	}

	onFormChange() {
		this.props.updateInvoice();
	}

	onCustomerSelectChange(ev) {
		const { value } = ev.target;
		this.props.updateCustomerSelection(value)
	}

	onProductSelect(ev) {
		const { value } = ev.target;
		this.props.updateProductSelection(value)
	}

	onChangeItemQty(ev) {
		const { value } = ev.target;
		const { itemToAdd } = this.state;

		if(value < 0) 
			return;		

		this.setState({
			itemToAdd: {
				...itemToAdd,
				qty: value
			}
		});
	}

	onChangeSaveNewItem(ev) {
		const { itemToAdd } = this.state;

		if(itemToAdd.qty == 0) {
			swal('Please Select A Quantity');
			return;
		}	

		this.props.invoiceAddItem(itemToAdd);
		this.setState({itemToAdd: null});
	}

	onChangeRemoveNewItem(ev) {
		this.setState({itemToAdd: null});
	}

	render() {

		const { 
			customers, 
			products, 
			selectedCustomer, 
			selectedProduct 
		} = this.props;

		const { itemToAdd } = this.state;

		const selectedCustomerId = selectedCustomer ? selectedCustomer.id : null;
		const selectedProductId = selectedProduct ? selectedProduct.id : null;

		return (
			<div>
				<form 
					className="InvoiceForm"
					onChange={(ev) => this.onFormChange()}
				>
					<div className="form-group">
						<label htmlFor="customerName">Customer</label>
						<select 
							className="form-control" 
							id="customerName"
							onChange={(ev) => this.onCustomerSelectChange(ev)}
							value={selectedCustomerId}
						>
						  
						  <option>Select a customer ...</option>

						  {
						  	customers.map(c => <option value={c.id}>{c.name}</option>)
						  }

						</select>				
					</div>			

					<div className="form-group">
						<label htmlFor="customerName">Add Product</label>
						<select 
							className="form-control" 
							id="customerName"
							onChange={(ev) => this.onProductSelect(ev)}
							value={selectedProductId}
							disabled={!selectedCustomer}
						>
						  
						  <option>Select a product ...</option>

						  {
						  	products.map(p => <option value={p.id}>{p.name}</option>)
						  }

						</select>				
					</div>

					{
						itemToAdd &&
						<div className="ItemToAdd">

							<h4>{itemToAdd.name}</h4>
							<form className="form-inline">
								<div className="form-group">											
									<label htmlFor='itemQuantity'>Quantity</label>
									<input type="number" className="form-control" id='itemQuantity' value={itemToAdd.qty} onChange={(ev) => this.onChangeItemQty(ev)}/>
								</div>
								<div className="form-group ItemActions">
									<a
										onClick={(ev) => this.onChangeSaveNewItem(ev)}
									>
										<i className="fa fa-check" aria-hidden="true"/>
									</a>
									<a
										onClick={(ev) => this.onChangeRemoveNewItem(ev)}
									>
										<i className="fa fa-times" aria-hidden="true"/>
									</a>
								</div>
							</form>
						</div>
					}

				</form>
			</div>
		);
	}
}

InvoiceForm.propTypes = {
	customers: React.PropTypes.array,
	products: React.PropTypes.array
}