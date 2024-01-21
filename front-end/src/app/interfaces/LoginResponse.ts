
export interface LoginResponse{

    succeeded: boolean,
    message: string,
    errors: null,
    data: {
      id: string,
      userName: string,
      email: string,
      roles: [
       
      ],
      isVerified: boolean,
      jwToken: string,
      refreshToken: string,
      churchId: string,
      peerdID: string,
      colaborador: string
    }
}