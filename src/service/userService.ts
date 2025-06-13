import { User } from "../types";

const users: User[] = [];

export async function getUsersFromDb() {
  try {
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const data: User[] = await response.json();
    users.push(...data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

export async function addUser(data: any):Promise<Response|undefined> {
  try {
    const req = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return req
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
export function checkUserEmailExist(email: string): boolean {
  return users.some((user) => user.email === email);
}
export function checkUserNameExist(userName: string): boolean {
  return users.some((user) => user.id === userName);
}

export function getUserFullName(id:string){
  if(users.length === 0) return;
  const userFullName = users.filter((user) => user.id === id);
  return userFullName[0].name;
}

export function authenticateUser(userName: string, password: string) {
  // if(localStorage.getItem('user') != null){
  //   return localStorage.getItem('user');
  // }
  
  const user = users.find((u) => u.id === userName);
  if (!user) {
    return false;
  }
  if (user.password !== password) {
    return false;
  }
  localStorage.setItem('user',JSON.stringify(user));
  return user;
}

export function logOutUser(){
  localStorage.setItem('user','');
}
