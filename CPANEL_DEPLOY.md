# cPanel Deployment Guide (Node.js Selector)

Since you are using a standard cPanel account without a VPS, follow these steps to host your SCW Marketplace.

## 1. Prepare your Files
1. On your local machine, run `npm run build`.
2. Zip the entire project folder **EXCEPT** for `node_modules`, `.next`, and `.git`.
3. Log in to your cPanel.

## 2. Create the Node.js Application
1. In cPanel, search for **"Setup Node.js App"**.
2. Click **"Create Application"**.
3. Set the following:
   - **Node.js version**: Select **20.x** (or the highest available).
   - **Application mode**: `production`.
   - **Application root**: `scw-marketplace` (or any folder name).
   - **Application URL**: Select your domain.
   - **Application startup file**: `server.js` (We will create this).
4. Click **Create**.

## 3. Upload and Install
1. Go to **File Manager** and enter the `scw-marketplace` folder.
2. **Upload** your zip file and **Extract** it here.
3. Go back to the **Node.js App** settings.
4. Click **"Run NPM Install"**. This will take a few minutes.

## 4. Create the Startup File (server.js)
In the `scw-marketplace` folder, create a new file named `server.js` and paste this:
```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = false
const hostname = 'localhost'
const port = process.env.PORT || 3000
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
```

## 5. Environment Variables
1. In the Node.js App settings, find the **"Environment variables"** section.
2. Add your `GEMINI_API_KEY`.

## 6. Restart
Click **"Restart"** on your Node.js application. Your website should now be live at your domain!

---
**Note:** If your cPanel does NOT have "Setup Node.js App", you cannot run a dynamic Next.js site. You would need to use `output: 'export'` in `next.config.ts`, but this will disable the AI features.