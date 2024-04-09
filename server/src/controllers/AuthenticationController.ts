import { Request, Response } from 'express';
import Authentication from '../utils/models/UserModel';

// Controller function to fetch authentication details by UserID
export const getAuthenticationByUserID = async (req: Request, res: Response): Promise<void> => {
  try {
    const { UserID } = req.params;
    const authentication = await Authentication.findOne({ where: { UserID } });
    if (!authentication) {
      res.status(404).json({ message: 'Authentication details not found' });
      return;
    }
    res.status(200).json(authentication);
  } catch (error) {
    console.error('Error fetching authentication details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// // Controller function to create authentication details
// export const createAuthentication = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { UserID, hashedPassword } = req.body;

//     // Ensure that only the expected properties are included
//     const authentication = await Authentication.createAuthentication({ UserID, hashedPassword });
    
//     res.status(201).json({ message: 'Authentication details created successfully', authentication });
//   } catch (error) {
//     console.error('Error creating authentication details:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// Controller function to update authentication details
export const updateAuthentication = async (req: Request, res: Response): Promise<void> => {
  try {
    const { UserID } = req.params;
    const { HashedPassword } = req.body;
    const authentication = await Authentication.findOne({ where: { UserID } });
    if (!authentication) {
      res.status(404).json({ message: 'Authentication details not found' });
      return;
    }
    await authentication.update({ HashedPassword: HashedPassword });
    res.status(200).json({ message: 'Authentication details updated successfully', authentication });
  } catch (error) {
    console.error('Error updating authentication details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function to delete authentication details
export const deleteAuthentication = async (req: Request, res: Response): Promise<void> => {
  try {
    const { UserID } = req.params;
    const authentication = await Authentication.findOne({ where: { UserID } });
    if (!authentication) {
      res.status(404).json({ message: 'Authentication details not found' });
      return;
    }
    await authentication.destroy();
    res.status(200).json({ message: 'Authentication details deleted successfully' });
  } catch (error) {
    console.error('Error deleting authentication details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
