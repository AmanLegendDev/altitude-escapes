import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

export interface IDestination
  extends Document {
  name: string;

  slug: string;

  shortDescription: string;

  description: string;

  country: string;

  state: string;

  city: string;

  bestTime: string;

  altitude: string;

  heroImage: string;

  gallery: string[];

  seoTitle: string;

  seoDescription: string;

  status: "active" | "inactive";

  createdAt: Date;

  updatedAt: Date;
}

const DestinationSchema =
  new Schema<IDestination>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },

      shortDescription: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },

      country: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        default: "",
      },

      city: {
        type: String,
        default: "",
      },

      bestTime: {
        type: String,
        default: "",
      },

      altitude: {
        type: String,
        default: "",
      },

      heroImage: {
        type: String,
        default: "",
      },

      gallery: {
        type: [String],
        default: [],
      },

      seoTitle: {
        type: String,
        default: "",
      },

      seoDescription: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "active",
          "inactive",
        ],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

const Destination: Model<IDestination> =
  mongoose.models.Destination ||
  mongoose.model<IDestination>(
    "Destination",
    DestinationSchema
  );

export default Destination;