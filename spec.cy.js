describe('My first test', () => {
  it('Does not do much', () => {
    expect(true).to.equal(false)
  })
})


describe('My second test', () => {
  it('Does not do much', () => {
    expect(true).to.equal(true)
  })
})


describe(" My third test on a real site ", () =>{
	it("Visits a site", () =>{
		cy.visit("example.cypress.io")
	})
})


describe("My 4th test on a site", () => {
	it("Finds an element", () =>{
		cy.visit("example.cypress.io")
		
		cy.contains("type")
	})
})

describe("My 5th test on a site", ()=>{
	it("Clicks an element", ()=>{
		cy.visit("example.cypress.io")
		
		cy.contains("type").click()
	})
})

describe("My 6th test on a site", () =>{
	it("Uses the should assertation", () => {
		cy.visit("example.cypress.io")
		
		cy.contains("type").click()
		
		cy.url().should("include", "/commands/actions")
	})
})

describe("My 7th test", () => {
	it("Chains more commands", () => {
		cy.visit("example.cypress.io")
		
		cy.contains("type").click()
		
		cy.get(".action-email").type("a@a.com")
		
		cy.get(".action-email").should("have.value", "a@a.com")
	})
})