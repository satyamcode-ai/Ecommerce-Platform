
async function testPayment() {
    try {
        console.log('Sending request to payment endpoint...');
        const response = await fetch('http://127.0.0.1:5000/api/payment/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test@example.com',
                items: [
                    {
                        id: 1,
                        name: 'Test Product',
                        price: 10.00,
                        image: 'https://via.placeholder.com/150',
                        quantity: 1
                    }
                ]
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('PAYMENT_TEST_SUCCESS');
            console.log('Session ID:', data.id);
            console.log('Session URL:', data.url);
        } else {
            console.log('PAYMENT_TEST_FAILED');
            console.log('Status:', response.status);
            const text = await response.text();
            console.log('Response:', text);
        }
    } catch (error) {
        console.log('PAYMENT_TEST_ERROR');
        console.error('Error:', error.message);
    }
}

testPayment();
