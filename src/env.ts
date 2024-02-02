interface IEnv {
    jwtTokenExpire: string;
    jwtTokenSecretKey: string;
}

export const env = {
    jwtTokenExpire: '1h',
    jwtTokenSecretKey: 'asdsajsdlasjdsabljbhdakdhakd'
}