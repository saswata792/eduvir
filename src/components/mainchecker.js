
class Mainchecker 
{
    constructor()
    {

        this.profile=0;
    }
    setProfile(check)
    {
        this.profile=check;
    }
    getProfile()
    {
        return(
            this.profile
        );
    }
}

export default new Mainchecker();