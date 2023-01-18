import { RequestHandler } from 'express';
import { users as UserSchema } from '@models/Users';
import users, { IUsers } from '@models/Users/users';

export const createUser: RequestHandler<IUsers> = async (req, res) => {
  const { name, address, phone, image, role, isActive, password }: IUsers =
    req.body;
  try {
    const newUser: IUsers = new UserSchema({
      name,
      address,
      phone,
      image,
      role,
      isActive,
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
  } catch (error) {
    console.error(error);
  }
};

export const getUserById: RequestHandler = async (_req, res) => {
  const { idUser } = _req.params;
  try {
    const user = await UserSchema.findById(idUser);
    res.json(user);
  } catch (error) {
    console.error(error);
  }
};

export const updateUser: RequestHandler<IUsers> = async (req, res) => {
  const { id } = req.params;
  const { name, address, phone, email, image, password }: IUsers = req.body;
  const findUserById = await users.findById(id);
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
