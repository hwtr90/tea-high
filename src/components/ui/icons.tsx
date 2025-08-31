// Tea High Icon Library - Lucide React + Custom Tea Icons
import { 
  Search,
  Thermometer, 
  Weight,
  Timer,
  Tag,
  Check,
  AlertCircle,
  Plus,
  X,
  ChevronDown,
  Star,
  Filter,
  SortAsc,
  Edit,
  Trash2,
  Upload,
  Download,
  Home,
  Settings,
  User,
  LogOut,
  Camera,
  Image,
  MapPin,
  Calendar
} from 'lucide-react';

// Re-export Lucide icons with consistent naming for Tea High
export const SearchIcon = Search;
export const ThermometerIcon = Thermometer;
export const ScaleIcon = Weight;
export const ClockIcon = Timer;
export const TagIcon = Tag;
export const CheckIcon = Check;
export const ExclamationIcon = AlertCircle;
export const PlusIcon = Plus;
export const XIcon = X;
export const ChevronDownIcon = ChevronDown;
export const StarIcon = Star;
export const FilterIcon = Filter;
export const SortIcon = SortAsc;
export const EditIcon = Edit;
export const DeleteIcon = Trash2;
export const UploadIcon = Upload;
export const DownloadIcon = Download;
export const HomeIcon = Home;
export const SettingsIcon = Settings;
export const UserIcon = User;
export const LogOutIcon = LogOut;
export const CameraIcon = Camera;
export const ImageIcon = Image;
export const LocationIcon = MapPin;
export const CalendarIcon = Calendar;

// Custom Tea-Specific Icons (add as needed)
// Example: Future custom tea leaf icon, tea cup icon, etc.

export const TeaCupIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {/* Custom tea cup SVG - add when needed */}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8m-4-8v16" />
  </svg>
);

// Note: Add more custom tea icons here as needed
// - TeaLeafIcon
// - SteamingCupIcon
// - TeaPotIcon
// - etc.
