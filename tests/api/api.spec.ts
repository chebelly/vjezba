import { test, expect } from '@playwright/test'

test.describe.parallel("API testing", () => {
const baseUrl = 'https://reqres.in/api'
// testiranje jako slicno kao u Postmanu, ispitujemo valjan kod i sadrzaj bodija   
     
    test("Simple API test - Assert Response Status", async ({ request }) => {
         const response = await request.get(`${baseUrl}/users/3`)
         expect(response.status()).toBe(200)

         const responseBody = JSON.parse(await response.text())
         // kada hocemo da vadimo informaicja iz bodya, uvijek napraviti varijablu
         
})
    
    test("Simple API test - Assert Invalid Endpoint", async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/non-existing-enpoint`)
    expect(response.status()).toBe(404)
})
   
    test("GET Request - Get User Detail", async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/1`)
    const responseBody =JSON.parse(await response.text())

    expect(response.status()).toBe(200)
    expect(responseBody.data.id).toBe(1)
    expect(responseBody.data.first_name).toBe('George') //toContainText ne moze!
    expect(responseBody.data.last_name).toBe('Bluth')
    expect(responseBody.data.email).toBeTruthy()
    console.log(responseBody)


    })
    test("POST Request - Create a user", async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
            data: {
                id: 1000,
                name: "Morpheus",
                position: "leader",
            },
        })
        const responseBody =JSON.parse(await response.text())
    
        expect(response.status()).toBe(201)
        expect(responseBody.id).toBe(1000)
        expect(responseBody.name).toBe('Morpheus') //toContainText ne moze!
        expect(responseBody.position).toBe('leader')
        expect(responseBody.email).toBeFalsy()
        expect(responseBody.createdAt).toBeTruthy()
        console.log(responseBody)
    })

    test("POST Request - Login", async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            },
        })
        const responseBody =JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBe("QpwL5tke4Pnpja7X4")

})
test("POST Request - Login Failed", async ({ request }) => {
    const response = await request.post(`${baseUrl}/login`, {
        data: {
            
            "email": "peter@klaven"
        },
    })
    const responseBody =JSON.parse(await response.text())
    expect(response.status()).toBe(400)
    expect(responseBody.error).toBe("Missing password")
})
test("PUT Request - Update USer", async ({ request }) => {
    const response = await request.put(`${baseUrl}/users/2`, {
        data: {

        "name": "morpheus",
        "job": "zion resident"
        
    },
})
    const responseBody =JSON.parse(await response.text())
    expect(response.status()).toBe(200)
    expect(responseBody.name).toBe("morpheus")
    expect(responseBody.job).toBe("zion resident")
    expect(responseBody.updatedAt).toBeTruthy()
    console.log(responseBody)
})

})