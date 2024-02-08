import Header from "../../components/Header"
import './styles.css'
import backgroundImg from '../../assets/img/background.png'
import my_photo from '../../assets/img/my_photo.jpeg'
import ItemList from "../../components/ItemList"
import { useState } from "react";

export default function Home (){

    const [user, setUser] = useState('');
    const [currentUser, setCurrentUse] = useState(null);
    const [repos, setRepos] = useState(null);

    const handleGetDate = async () => {
        const userDate = await fetch(`https://api.github.com/users/${user}`);
        const newUser = await userDate.json();
        

        if(newUser.name){
            const {avatar_url, name, bio, login} = newUser
            setCurrentUse({avatar_url, name, bio, login});
            
            const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
            const newRepos = await reposData.json();

            if(newRepos.length){
                setRepos(newRepos);
            }
        }
        // console.log(newUser)
    }

    return(
        <div className="home">
            <Header/>
            <div className="conteudo">
                <div>
                    <img className="backgroundImg" src={backgroundImg} alt=" background app"/>
                </div>
                <div className="info">
                    <div>
                        <input value={user} onChange={event => setUser(event.target.value)} 
                        name="uruario" placeholder="@usuario"/>
                        <button onClick={handleGetDate}>Buscar</button>
                    </div>
                    {currentUser?.name ? (
                        <div className="perfil">
                            <img src={currentUser.avatar_url} className="profile"/>
                            <div>
                                <h3>{currentUser.name}</h3>
                                <span>@{currentUser.login}</span>
                                <p>{currentUser.bio}</p>
                            </div>
                        </div>
                    ) : null }
                    {repos?.length ? (
                        <div>
                            <h4 className="repositore">Repositorios</h4>
                            {repos.map(repo => (
                                <ItemList title={repo.name} decription={repo.decription}/>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}