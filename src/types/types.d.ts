type ArrayWithColumnInfo<T> = T[] & { columns?: String[] };

export interface Variable {
  name: string;
  description: string;
}

