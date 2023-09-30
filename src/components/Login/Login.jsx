import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../../firebase/firebase.init";
import { useState } from "react";

const Login = () => {
    const [user, setUser] = useState({});

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();


    // google signIn and signOut

    const handleGoogleSignIn = () => {
        // console.log('google')
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                setUser(user)
            })
            .catch((error) => console.log(error));
    }

    const handleGoogleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            setUser('')
        }).catch((error) => {
            // An error happened.
            console.log(error)
        });
    }


    // github signIn and signOut

    const handleGitHubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then((result) => {
                const user = result.user;
                setUser(user)
            })
            .catch((error) => console.log(error));
    }



    console.log(setUser)

    const { displayName, email, photoURL } = user;

    return (
        <div>
            {
                user && <div>
                    <img style={{ borderRadius: '50%' }} src={photoURL} alt="" />
                    <h3>Name : {displayName}</h3>
                    <h5>Email : {email}</h5>
                </div>
            }
            {
                user ? <button onClick={handleGoogleSignOut}>SignOut</button> : <div>
                    <button onClick={handleGoogleSignIn}>SignIn Google</button>
                    <button onClick={handleGitHubSignIn}>SignIn Github</button>
                </div>
            }

        </div>
    );
};

export default Login;