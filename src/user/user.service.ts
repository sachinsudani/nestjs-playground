import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    private users = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' },
        { id: 3, name: 'Bob Smith', email: 'bob.smith@example.com' },
    ];

    getAllUsers() {
        return this.users;
    }

    getUserById(id: number) {
        return this.users.find(user => user.id === id);
    }
}
