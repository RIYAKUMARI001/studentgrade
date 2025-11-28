# studentgrade
# Grade Management Smart Contract UI

## **Contract Address**
Explorer: https://coston2-explorer.flare.network/address/0xD79cbD5278CEcB3f88cEeeCa1F9B146254830E4e
<img width="1851" height="851" alt="image" src="https://github.com/user-attachments/assets/25b94773-71f4-45b8-a8fe-b090496d9091" />


---

## **Description**
This project provides a clean, modern, and developer-friendly frontend integration for interacting with a Grade Management smart contract deployed on the Flare Coston2 testnet.

The contract allows:
- Setting a student’s grade (owner-only action)
- Fetching any student’s grade (public)

The UI is built using **Next.js**, **Wagmi**, and **Viem**, providing seamless wallet connection, transaction state handling, and real-time updates after confirmations.

---

## **Features**
### **Contract Interaction**
- Fetch grade of any student
- Update/set grade for a student (owner-only)

### **UI/UX**
- Wallet-gated interface (requires wallet connection)
- Clean and responsive design
- Form validation & error handling
- Loading and confirmation indicators
- Transaction hash viewer with confirmation status

### **Technical**
- Uses Wagmi’s `useReadContract`, `useWriteContract`, and `useWaitForTransactionReceipt`
- ABI-driven typed contract interactions
- Modular hook (`useGradeContract`)
- Fully reusable sample UI component

---

## **How It Solves Problems**
This project solves the need for a quick, reliable, and modern boilerplate for interacting with simple Web3 smart contracts — especially those involving read/write operations such as managing academic records, credentials, or identity attributes.

### **Use Cases**
- Teachers updating grades on-chain
- Students verifying their grades publicly
- Demonstrating blockchain-backed academic certification
- Building educational decentralized apps (EdTech dApps)

### **Benefits**
- Removes friction in developing Web3 UIs
- Provides a ready-to-use example for Wagmi + Viem integration
- Ensures secure and transparent grade management
- Serves as a starting point for extending to full academic management systems

