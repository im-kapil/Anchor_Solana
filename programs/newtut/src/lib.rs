use anchor_lang::prelude::*;

declare_id!("5n1fP65uWvoLpmWfzbGgpyD5kVX3mnVfJgBfy5NzdEbn");

//6YUugx7sa32WL8jDZXYR2G7MCrMrNVCyyepbfiinbFXm

#[program]
pub mod newtut {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        
        Ok(())
    }
    pub fn assign(ctx: Context<Prav>) -> ProgramResult {
        let base_account = &mut ctx.accounts.baseac;
        base_account.num = 100;
         Ok(())

    }
    pub fn changeval(ctx: Context<Prav>, data:u16)  -> ProgramResult{
        let base_account = &mut ctx.accounts.baseac;
        base_account.num = data;
        Ok(())
    }

    pub fn increament(ctx: Context<Increase>) -> ProgramResult{
        let increment = &mut ctx.accounts.increament_account;
        increment.number +=1;
        Ok(())
    }

}

#[derive(Accounts)]
pub struct Initialize{}

#[derive(Accounts)]
pub struct Changeval<'info> {
    #[account(init, payer = payeruser, space = 8 + 8)]
    pub baseac : Account<'info, Base>,
    #[account(mut)]
    pub payeruser: Signer<'info>,
    pub system_program: Program <'info, System>,
}

#[derive(Accounts)]
pub struct Prav<'info> {
    
    #[account(init, payer = payeruser, space = 8 + 8)]
    pub baseac : Account<'info, Base>,
    #[account(mut)]
    pub payeruser: Signer<'info>,
    pub system_program: Program <'info, System>,
}

#[derive(Accounts)]
pub struct Increase<'info> {
    
    #[account(init, payer = payeruser, space = 8 + 8)]
    pub increament_account : Account<'info, Increment>,
    #[account(mut)]
    pub payeruser: Signer<'info>,
    pub system_program: Program <'info, System>,
}


#[account]
// this account  struct will later be used to fetch from javascript in camel case 
//for ex if it is Base B in capital, so it will be fetched as base program.account.base.fetch(myAccount.publicKey). 
//if it is BaseAccount so it will be fetched as baseAccount

pub struct Base{
    pub num :u16
}

#[account]
pub struct Increment{
    pub number : u16 
}
