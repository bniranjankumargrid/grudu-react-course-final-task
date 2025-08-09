import { useState } from "react";
import "./AuthForm.css";
import { Errors, User } from "../../types";
import { addUser, authenticateUser, checkUserEmailExist, checkUserNameExist, getUsersFromDb } from "../../service/userService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { baseAuthSchema, signupSchema } from "../../schema/auth.schema";
import z from "zod";
function AuthForm() {
  const { setLoggedInUser } = useAuth();
  const [logOrSign, setLogOrSign] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();

  function buttonClick() {
    setLogOrSign(!logOrSign);
    setErrors({});
  }


  function validateForm() {
    try {
      if (logOrSign) {
        signupSchema.parse({
          userName,
          password,
          email,
          fullName
        });
      } else {
        baseAuthSchema.parse({
          userName,
          password
        });
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Errors = {};
        error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as string; 
          newErrors[fieldName] = issue.message;
        });
        setErrors(newErrors as Errors);
      }
      return false;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validateForm()) {
      if (logOrSign) {
        const userDetail = {
          id:userName,
          email:email,
          name:fullName,
          password:password
        }
        console.log(userDetail);
        if(checkUserEmailExist(userDetail.email)){
          setErrors((prevState) => {
            return {
              ...prevState,
              ...{ emailFound: "Account already exist with this email. Please login" },
            };
          });
          return;
        }
        if(checkUserNameExist(userDetail.id)){
          setErrors((prevState) => {
            return {
              ...prevState,
              ...{ userNameFound: "Username is taken" },
            };
          });
          return;
        }
        addUser(userDetail).then(async() => {
           await getUsersFromDb();
          const authStatus = authenticateUser(userName, password);
          if (authStatus) {
            setLoggedInUser(authStatus as User);
            navigate('/');
            
          }
        }).catch((e) => console.error(e));
      } else {
        const authStatus = authenticateUser(userName, password);
        if (authStatus) {
          setLoggedInUser(authStatus as User);
          navigate('/');
          
        } else {
          setErrors((prevState) => {
            return {
              ...prevState,
              ...{ userNotFound: "Username or password doesn't match" },
            };
          });
        }
      }
    }
  }

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-title">{logOrSign ? "Sign in" : "Log in"}</div>
        <form className="form-layout" onSubmit={handleSubmit} noValidate>
          {logOrSign && (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </>
          )}
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          {errors.userNameFound && <p className="error-text">{errors.userNameFound}</p>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
          {logOrSign && (
            <>
              <input
                type="text"
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <p className="error-text">{errors.fullName}</p>
              )}
            </>
          )}
          <button type="submit">{logOrSign ? "Sign in" : "Log in"}</button>
        </form>
      </div>
      <div>
       <p className="error-text"> {errors.userNotFound || errors.emailFound}</p>
      </div>
      <div>
        {logOrSign ? "Already have an account?" : "Don't have an account?"}
        <span className="form-signLog" onClick={buttonClick}>
          {logOrSign ? " Log in" : " Sign in"}
        </span>
      </div>
    </div>
  );
}

export default AuthForm;