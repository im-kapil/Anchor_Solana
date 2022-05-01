const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;
const assert = require("assert");


  
describe('newtut', () => {

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const providerWalletPublicKey = provider.wallet.publicKey


  it('Is initialized!', async () => {
    // Add your test here.
    const program = anchor.workspace.Newtut;
    const tx = await program.rpc.initialize();
     console.log("Your Transaction Signature:- ", "https://explorer.solana.com/tx/"+tx+"?cluster=devnet");
  });

  it("Can assign the value", async () => {

    const myAccount = anchor.web3.Keypair.generate();
    const program = anchor.workspace.Newtut;
    const tx = await program.rpc.assign(
      {
        accounts: {
          baseac: myAccount.publicKey,
           payeruser: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
         signers: [myAccount],
      }
    );
    const varb = await program.account.base.fetch(myAccount.publicKey);
    assert.ok(varb.num== 100);
    console.log("Your Transaction Signature:- ", "https://explorer.solana.com/tx/"+tx+"?cluster=devnet");

  });

  it("Can change the value",  async ()=>{

    const myAccount = anchor.web3.Keypair.generate();
    const program = anchor.workspace.Newtut;
    const tx = await program.rpc.changeval(data=200, {
      accounts: {
        baseac: myAccount.publicKey,
        payeruser: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
       signers: [myAccount],
    });
    const varb = await program.account.base.fetch(myAccount.publicKey);
    assert.ok(varb.num== 200);

    console.log("Your Transaction Signature:- ", "https://explorer.solana.com/tx/"+tx+"?cluster=devnet");

  });

  it("Can call the increment instruction",  async ()=>{

    const myAccount = anchor.web3.Keypair.generate();
    const program = anchor.workspace.Newtut;
    const tx = await program.rpc.increament({
      accounts: {
        increamentAccount: myAccount.publicKey,
        payeruser: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
       signers: [myAccount],
    });
    const varb = await program.account.increment.fetch(myAccount.publicKey);
    assert.ok(varb.number== 1);

    console.log("Your Transaction Signature:- ", "https://explorer.solana.com/tx/"+tx+"?cluster=devnet");

  });
});
