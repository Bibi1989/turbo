export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
