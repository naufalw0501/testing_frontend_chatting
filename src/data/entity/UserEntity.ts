class UserEntity {
    name: string;
    email: string;

    constructor(object: UserEntity) {
        this.name = object.name;
        this.email = object.email;
    }
}
export { UserEntity};