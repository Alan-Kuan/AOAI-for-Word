# Azure OpenAI for Word
An Office Add-in with the magic from OpenAI

## Screenshots
![Login.png](https://github.com/Alan-Kuan/AOAI-for-Word/assets/24734750/a6d21cca-3f0a-4387-9734-72fe0299a153)
> **Note**
> login page will not show during local development

![Settings.png](https://github.com/Alan-Kuan/AOAI-for-Word/assets/24734750/c05f68f5-d687-457f-af09-f2b6052167e2)

![Completion.png](https://github.com/Alan-Kuan/AOAI-for-Word/assets/24734750/e11da2c7-d8c8-44f8-8ace-0d46d65a1516)

## Production Environment Setup
Please refer to [AOAI-for-Word-backend](https://github.com/Alan-Kuan/AOAI-for-Word-backend).

## Development Environment Setup on Windows
1. Install [winget](https://learn.microsoft.com/zh-tw/windows/package-manager/winget/).
    - It probably has already been installed on Windows.
2. Start PowerShell and use winget to install Node.js LTS and pnpm.
    - It's recommended to start PowerShell on [Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/install).
    ```sh
    winget install openjs.nodejs.lts pnpm
    ```
3. [Optional] Add an alias for pnpm in PowerShell's profile.
   - If you skip this step, you'll have to use `pnpm-win-x64.exe` in latter steps
    ```powershell
    Set-Alias -Name pnpm -Value pnpm-win-x64.exe
    ```
3. Restart PowerShell.
4. Clone the repo.
    ```sh
    git clone https://github.com/Alan-Kuan/AOAI-for-Word
    ```
5. Install dependencies.
    ```sh
    pnpm install
    ```
6. Create certificates for development purposes.
    ```sh
    npx office-addin-dev-certs install --days <validity period in days>
    ```
7. Start development server.
    ```sh
    pnpm dev
    ```
8. Sideload the Add-in.
   ```sh
   pnpm sideload
   ```
