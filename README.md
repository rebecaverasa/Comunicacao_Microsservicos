# This is a microsservices communication project for the final challenge on the intern's backend trial of Instituto Atlantico.
Here, we will simulate a small sales sistem.

We will have:
- A node.js isolated API wich will do the authentication.
- A node.js API wich will be responsable for register the sales.
- A spring API wich will be responsable for handle the product stock.

Every time a sale is made, a message will be send from the sales API to the product API so the stock can be updated.
To acomplish each sale, it will be necessary to request the products API for de ids datas of the shopping cart products.
When we receive a sale message to update de stock, we will return a message to the sales API with status ok or not, updating with "canceled" or "completed".

Here project's architecture:
![image](https://user-images.githubusercontent.com/68878545/191582963-418b899a-b983-413c-b2ec-e69178f49e68.png)
