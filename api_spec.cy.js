describe('template spec', () => {
	/*beforeEach(() => {
		cy.visit('localhost:3000')
	})
	
	it.only('passes', () => {
		cy.getByDataTest('email-input').type('john@example.com')
		cy.getByDataTest('submit-button').click()
		cy.getByDataTest('server-error-message').should('contain', 'already exists')
	})
	
	it('Makes a get request', () => {
		cy.request('GET', 'https://bstackdemo.com/').then((response) => {
			expect(response.headers.connection).to.eq('keep-alve')
		})
	})*/
	
	it('Sends a POST', () => {
		cy.request({
			method : 'POST',
			url: 'https://reqres.in/api/users',
			body:{
				name : 'test1212',
				job : 'boss',
				id : '123456'
			}
		}).then((response) => {

				expect(response.status).to.eq(201)
				expect(response.body.name).to.eq('test1212')
				cy.url().log()

		})
	})	
	

	
	it('Gets a ZamuPay auth token', () => {
		cy.request({
			method : 'POST',
			url: 'https://auth.zamupay.com/connect/token',
			form : true,
			body:{
				grant_type: 'client_credentials',
				client_id: 'Omega',
				client_secret: 'Omega',
				scope: 'PyPay_api'
			}
			
		}).then((response) => {
			cy.log(response.body.access_token)
			cy.writeFile('cypress/fixtures/token.txt', response.body.access_token)
		})
	})
	
	it('Purchases airtime', ()=> {
		cy.fixture('token.txt', {timeout : 20000}).then((token) => {
			const originatorConversationId = Cypress._.random(0, 1e6);
			cy.request({
				method : 'POST',
				url: 'https://sandboxapi.zamupay.com/v1/airtime-purchase',
				headers: {
					Authorization : `Bearer ${token}`
				},
				body: {
					originatorConversationId: originatorConversationId,
					callbackURL: "https://en1ezbmu2vsd.x.pipedream.net",
					recipients:
					[
						{
							currencyCode: "KES",
							phoneNumber: "254700000000",
							amount: 99,
							name: "Jojo Siwa"
						}
					]
				}
			})
		})
	})
	
	it.only('Makes a bill request', () => {
		cy.fixture('token.txt').then((token) => {
			var originatorConversationId = Cypress._.random(0, 1e6);
			cy.request({
				method: 'POST',
				url: 'https://sandboxapi.zamupay.com/v1/bill-payments',
				headers: {
					Authorization : `Bearer ${token}`
				},
				body : {
					serviceCode: "KE-ZUKU",
					accountNumber: "240065",
					transactionType: 2,
					transactionDesc: "Bill Payment NEW",
					originatorConversationId: originatorConversationId,
					msisdn: "254710000000",
					narration: "Kyle testing",
					amount: 100,
					customerNames: "Omega",
					countryCode: "KE",
					currencyCode: "KES",
					saveBillerNumber: true,
					callBackUrl: "https://eo2j2658kmohqiy.m.pipedream.net"

				}
			}).then((response) => {
				cy.log(response.body.message.remarks)
			})
		})
	})
	
  
})