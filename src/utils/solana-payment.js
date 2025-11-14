// src/utils/solana-payment.js
import {Transaction, SystemProgram, PublicKey, Connection, TransactionInstruction} from '@solana/web3.js';
import { createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';

// Solana 配置
const SOLANA_RPC_URL = 'https://api.devnet.solana.com';

// 创建转账交易
// 在 solana-payment.js 中确保正确创建交易

export const createTransferTransaction = async (
    fromPubkey,
    toPubkey,
    amount,
    tokenMint,
    memo,
    decimals = 9
) => {
    try {
        const connection = new Connection('https://api.devnet.solana.com');

        // 1. 创建代币转账指令
        const fromTokenAccount = await getAssociatedTokenAddress(
            new PublicKey(tokenMint),
            new PublicKey(fromPubkey)
        );

        const toTokenAccount = await getAssociatedTokenAddress(
            new PublicKey(tokenMint),
            new PublicKey(toPubkey)
        );

        const transferInstruction = createTransferInstruction(
            fromTokenAccount,
            toTokenAccount,
            new PublicKey(fromPubkey),
            amount * Math.pow(10, decimals) // 转换为 lamports
        );

        // 2. 创建 memo 指令
        const memoProgramId = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');
        const memoInstruction = new TransactionInstruction({
            keys: [],
            programId: memoProgramId,
            data: Buffer.from(memo, 'utf8')
        });

        // 3. 组合交易
        const transaction = new Transaction().add(transferInstruction, memoInstruction);

        // 设置最近的区块哈希
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = new PublicKey(fromPubkey);

        return transaction;

    } catch (error) {
        console.error('创建交易失败:', error);
        throw error;
    }
};

// 检查代币余额
export const checkTokenBalance = async (walletAddress, mintAddress) => {
    try {
        const connection = new Connection(SOLANA_RPC_URL);
        const publicKey = new PublicKey(walletAddress);
        const mintPublicKey = new PublicKey(mintAddress);

        const tokenAccount = await getAssociatedTokenAddress(mintPublicKey, publicKey);

        try {
            const accountInfo = await connection.getTokenAccountBalance(tokenAccount);
            return accountInfo.value.uiAmount; // 返回 UI 金额（已考虑小数位数）
        } catch (error) {
            // 如果代币账户不存在，返回0
            if (error.message.includes('could not find account')) {
                return 0;
            }
            throw error;
        }
    } catch (error) {
        console.error('检查代币余额失败:', error);
        return 0;
    }
};
