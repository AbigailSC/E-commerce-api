import { RequestHandler } from 'express';
import { users as UserSchema } from '@models/Users';
import { IUsers } from '@models/Users/users';

export const createUser: RequestHandler<IUsers> = async (req, res) => {
  const { name, address, phone, image, role, password }: IUsers = req.body;
  try {
    const newUser: IUsers = new UserSchema({
      name,
      address,
      phone,
      image,
      role,
      isActive: true,
      password
    });
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ message: { error } });
  }
};

export const getUsers: RequestHandler = async (_req, res) => {
  try {
    const allUsers = await UserSchema.find({ isActive: true });
    res.json(allUsers);

    allUsers.length > 0
      ? res.json(allUsers)
      : res.send({ msg_mesage: 'No users found' });
  } catch (error) {
    console.error(error);
  }
};

export const getUserById: RequestHandler = async (_req, res) => {
  const { idUser } = _req.params;
  try {
    const user = await UserSchema.findById(idUser);
    user === null
      ? res.json(user)
      : res.send({ msg_mesage: 'User not found!' });
  } catch (error) {
    console.error(error);
  }
};

export const updateUser: RequestHandler<IUsers> = async (req, res) => {
  const { id } = req.params;
  const { name, address, phone, email, image, password }: IUsers = req.body;
  const findUserById = await UserSchema.findById(id);
  try {
    if (findUserById != null) {
      await findUserById.updateOne(
        {
          name,
          address,
          phone,
          email,
          image,
          password
        },
        {
          where: {
            id
          }
        }
      );
      res.send({ msg_message: 'User updated' });
    } else {
      res.send({ msg_mesage: 'User not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: { error } });
  }
};

export const deleteUser: RequestHandler = async (_req, res) => {
  const { idUser } = _req.params;

  try {
    const deleteUser = await UserSchema.update(
      { id: idUser },
      {
        isActive: false
      }
    );
    return res.status(201).json(deleteUser);
  } catch (error) {
    console.error(error);
  }
};