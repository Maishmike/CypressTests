describe("homepage", () => {
	
	beforeEach(() => {
		cy.visit("localhost:3000")
	})

	it("Checks if h1 contains the correct text", () =>{
		
		cy.get("[data-test = 'hero-heading']").contains("Testing Next.js Applications with Cypress")
	})
	
	it("Checks if homepage features are correct", () => {
		
		cy.get("dt").eq(0).contains("4 Courses")
		
		cy.get("dt").eq(1).contains("25+ Lessons")

		cy.get("dt").eq(2).contains(/free and open source/i)

	})
	
	it("Checks if my custom command works", () =>{
		
		cy.clickLink(/Get started/i)
		
	})
	
	it.only("Changes pages", () =>{
		cy.request('/cypress-fundamentals')
		cy.contains("Comma")
		
	})
})
