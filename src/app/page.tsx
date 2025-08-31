'use client';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { TextArea } from '@/components/ui/TextArea';
import { Rating } from '@/components/ui/Rating';
import { 
  SearchIcon, 
  ThermometerIcon, 
  ScaleIcon, 
  ClockIcon, 
  TagIcon,
  StarIcon,
  FilterIcon,
  EditIcon,
  DeleteIcon,
  PlusIcon,
  LocationIcon,
  CalendarIcon,
  TeaCupIcon
} from '@/components/ui/icons';

// Mock data for Select component demos
const teaTypes = [
  { value: 'white', label: 'White Tea' },
  { value: 'green', label: 'Green Tea' },
  { value: 'oolong', label: 'Oolong Tea' },
  { value: 'black', label: 'Black Tea' },
  { value: 'pu-erh-ripe', label: 'Pu-erh (Ripe)' },
  { value: 'pu-erh-raw', label: 'Pu-erh (Raw)' },
  { value: 'blends', label: 'Blends' },
];

const suppliers = [
  { value: 'yunnan-sourcing', label: 'Yunnan Sourcing' },
  { value: 'white2tea', label: 'White2Tea' },
  { value: 'crimson-lotus', label: 'Crimson Lotus Tea' },
  { value: 'teas-we-like', label: 'Teas We Like' },
  { value: 'mei-leaf', label: 'Mei Leaf' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tea High
          </h1>
          <p className="text-gray-600">
            Your personal tea tracking companion
          </p>
        </div>

        {/* Input Demo Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Component Demo: Inputs
          </h2>
          
          <div className="space-y-6">
            {/* Basic Inputs */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Basic Text Inputs</h3>
              
              <Input 
                label="Tea Name" 
                placeholder="Enter tea name..." 
                helperText="This will be the display name for your tea"
              />
              
              <Input 
                label="Tea Name (Required)" 
                placeholder="Dragon Well Green Tea" 
                required
              />
            </div>

            {/* Tea-Specific Inputs with Icons */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Tea Form Inputs</h3>
              
              <Input 
                type="search"
                label="Search Teas" 
                placeholder="Search your tea collection..." 
                leftIcon={<SearchIcon className="w-4 h-4" />}
              />

              <Input 
                type="number"
                label="Water Temperature (°F)" 
                placeholder="195" 
                leftIcon={<ThermometerIcon className="w-4 h-4" />}
                helperText="Recommended: 175-212°F"
              />

              <Input 
                type="number"
                label="Tea Amount (grams)" 
                placeholder="5" 
                leftIcon={<ScaleIcon className="w-4 h-4" />}
                helperText="Typical range: 3-7 grams"
              />

              <Input 
                type="number"
                label="Steep Time (seconds)" 
                placeholder="30" 
                leftIcon={<ClockIcon className="w-4 h-4" />}
                helperText="First steeping time"
              />
            </div>

            {/* Validation States */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Validation States</h3>
              
              <Input 
                label="Tea Name" 
                placeholder="Enter tea name..." 
                defaultValue=""
                error="Tea name is required"
              />
              
              <Input 
                label="Valid Tea Name" 
                placeholder="Dragon Well" 
                defaultValue="Dragon Well Green Tea"
                helperText="✓ Looks good!"
              />
            </div>

            {/* Different Input Types */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Input Types</h3>
              
              <Input 
                type="email"
                label="Email (for account)" 
                placeholder="your@email.com"
                autoComplete="email"
              />

              <Input 
                type="tel"
                label="Phone" 
                placeholder="(555) 123-4567"
                autoComplete="tel"
              />

              <Input 
                type="url"
                label="Supplier Website" 
                placeholder="https://teashop.com"
              />
            </div>

            {/* Disabled State */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Disabled State</h3>
              
              <Input 
                label="Read-only Field" 
                defaultValue="This field is disabled"
                disabled
                readOnly
                helperText="This field cannot be edited"
              />
            </div>
          </div>
        </div>

        {/* Select Demo Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Component Demo: Select Dropdowns
          </h2>
          
          <div className="space-y-6">
            {/* Tea Form Selects */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Tea Form Fields</h3>
              
              <Select
                label="Tea Type"
                placeholder="Choose tea type..."
                options={teaTypes}
                helperText="Select the primary tea category"
                required
              />

              <Select
                label="Supplier"
                placeholder="Choose supplier..."
                options={suppliers}
                allowCustom
                customPlaceholder="Enter new supplier name..."
                onAddCustom={(newSupplier) => {
                  console.log('Added new supplier:', newSupplier);
                  // In real app, this would update the suppliers list
                }}
                helperText="Can add new suppliers on the fly"
              />

              <Rating
                label="Tea Rating (1-10)"
                helperText="Drag to rate this tea"
                maxRating={10}
                showNumbers={false}
              />
            </div>

            {/* Validation States */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Validation States</h3>
              
              <Select
                label="Required Field"
                placeholder="Please select..."
                options={teaTypes}
                error="Tea type is required"
                required
              />
              
              <Select
                label="Pre-selected Option"
                options={teaTypes}
                defaultValue="oolong"
                helperText="✓ Oolong tea selected"
              />
            </div>

            {/* Different Configurations */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Special Features</h3>
              
              <Select
                label="Tea Type (Searchable)"
                placeholder="Search tea types..."
                options={teaTypes}
                helperText="Try typing to search options (shows search when 5+ options)"
              />

              <Select
                label="Disabled Select"
                placeholder="This is disabled"
                options={teaTypes}
                defaultValue="green"
                disabled
                helperText="This field is read-only"
              />
            </div>

            {/* Mobile Optimization Demo */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Mobile Features</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Quick Select"
                  placeholder="Tea type..."
                  options={teaTypes.slice(0, 3)}
                  helperText="48px+ touch targets"
                />
                
                <Rating
                  label="Rating"
                  maxRating={10}
                  size="sm"
                  helperText="Touch-friendly slider"
                  showNumbers={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* TextArea Demo Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Component Demo: TextArea
          </h2>
          
          <div className="space-y-6">
            {/* Tea Tasting Notes */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Tasting Notes Fields</h3>
              
              <TextArea
                label="Dry Leaf Aroma"
                placeholder="Describe the aroma of the dry tea leaves..."
                helperText="First impressions before steeping"
                minRows={2}
                maxRows={4}
              />

              <TextArea
                label="Wet Leaf Aroma"
                placeholder="Describe the aroma after the first pour..."
                helperText="Aroma after hot water is added"
                minRows={2}
                maxRows={4}
              />

              <TextArea
                label="Taste & Flavor Impressions"
                placeholder="Sweet, floral, earthy, astringent... describe the flavor profile and mouthfeel..."
                helperText="Overall taste experience and flavor notes"
                minRows={3}
                maxRows={6}
              />
            </div>

            {/* Supplier Description */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Product Information</h3>
              
              <TextArea
                label="Supplier Description"
                placeholder="Paste the supplier's product description, marketing copy, or additional details about this tea..."
                helperText="Product description from the tea supplier"
                minRows={4}
                maxRows={8}
              />
            </div>

            {/* Different Configurations */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Configuration Options</h3>
              
              <TextArea
                label="Quick Notes (Small)"
                placeholder="Short brewing notes..."
                minRows={2}
                maxRows={3}
                helperText="Compact text area for brief notes"
              />

              <TextArea
                label="Detailed Review"
                placeholder="Write a comprehensive tea review..."
                minRows={5}
                maxRows={10}
                helperText="Large text area for detailed reviews"
              />

              <TextArea
                label="Fixed Height (No Resize)"
                placeholder="This text area cannot be resized..."
                resize="none"
                minRows={3}
                helperText="Fixed size text area"
              />
            </div>

            {/* Validation States */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Validation States</h3>
              
              <TextArea
                label="Required Field"
                placeholder="Enter your tasting notes..."
                error="Tasting notes are required"
                required
                minRows={3}
              />
              
              <TextArea
                label="Valid Entry"
                defaultValue="This Dragon Well has a delicate, sweet flavor with notes of fresh grass and a light vegetal finish. The dry leaves have a beautiful flat appearance..."
                helperText="✓ Great tasting notes!"
                minRows={3}
              />

              <TextArea
                label="Disabled Field"
                defaultValue="This field is read-only and cannot be edited."
                disabled
                minRows={2}
                helperText="This field is disabled"
              />
            </div>
          </div>
        </div>

        {/* Rating Demo Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Component Demo: Slider Rating System
          </h2>
          
          <div className="space-y-6">
            {/* Tea Rating Examples */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Tea Rating (Primary Use Case)</h3>
              
              <Rating
                label="Overall Tea Rating"
                helperText="Drag the slider to rate this tea (0-10)"
                maxRating={10}
                showNumbers={true}
              />

              <Rating
                label="Flavor Complexity"
                helperText="How complex are the flavor notes?"
                defaultValue={7}
                maxRating={10}
                showNumbers={true}
              />

              <Rating
                label="Value for Money"
                helperText="Price vs quality assessment"
                defaultValue={8}
                maxRating={10}
                showNumbers={true}
              />
            </div>

            {/* Different Configurations */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Rating Configurations</h3>
              
              <Rating
                label="Clean Slider (No Numbers)"
                helperText="Simple slider without tick marks"
                showNumbers={false}
                maxRating={10}
                defaultValue={6}
              />

              <Rating
                label="With Numbers"
                helperText="Shows numeric tick marks below slider"
                showNumbers={true}
                maxRating={10}
                defaultValue={5}
              />

              <Rating
                label="5-Point Scale"
                helperText="Traditional 5-point system"
                maxRating={5}
                showNumbers={true}
                defaultValue={3}
              />
            </div>

            {/* Size Options */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Size Options</h3>
              
              <Rating
                label="Small Slider"
                size="sm"
                defaultValue={6}
                maxRating={10}
                helperText="Compact slider for tight spaces"
                showNumbers={false}
              />

              <Rating
                label="Medium Slider (Default)"
                size="md"
                defaultValue={7}
                maxRating={10}
                helperText="Standard size for most use cases"
                showNumbers={false}
              />

              <Rating
                label="Large Slider"
                size="lg"
                defaultValue={9}
                maxRating={10}
                helperText="Large slider for emphasis"
                showNumbers={false}
              />
            </div>

            {/* Validation States */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Validation States</h3>
              
              <Rating
                label="Required Rating"
                error="Please rate this tea"
                required
                maxRating={10}
                helperText="This field is required"
                showNumbers={true}
              />
              
              <Rating
                label="Valid Rating"
                defaultValue={8}
                maxRating={10}
                helperText="✓ Great rating!"
                showNumbers={true}
              />

              <Rating
                label="Disabled Rating"
                defaultValue={7}
                disabled
                maxRating={10}
                helperText="This rating cannot be changed"
                showNumbers={true}
              />
            </div>
          </div>
        </div>

        {/* Icon Library Demo */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Icon Library: Lucide React + Custom
          </h2>
          
          <div className="space-y-6">
            {/* Lucide Icons for Tea High */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Lucide React Icons</h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="flex flex-col items-center space-y-1">
                  <SearchIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-xs text-gray-500">Search</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <ThermometerIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-xs text-gray-500">Temp</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <ScaleIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-xs text-gray-500">Weight</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <ClockIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-xs text-gray-500">Timer</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <StarIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-xs text-gray-500">Rating</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <FilterIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-xs text-gray-500">Filter</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <EditIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-xs text-gray-500">Edit</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <DeleteIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-xs text-gray-500">Delete</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <LocationIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-xs text-gray-500">Origin</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <CalendarIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-xs text-gray-500">Harvest</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <PlusIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-xs text-gray-500">Add</span>
                </div>
                <div className="flex flex-col items-center space-y-1">
                  <TagIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-xs text-gray-500">Tag</span>
                </div>
              </div>
            </div>

            {/* Custom Tea Icons */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">Custom Tea Icons</h3>
              <div className="grid grid-cols-6 gap-4">
                <div className="flex flex-col items-center space-y-1">
                  <TeaCupIcon className="w-5 h-5 text-amber-600" />
                  <span className="text-xs text-gray-500">Tea Cup</span>
                </div>
                <div className="flex flex-col items-center space-y-1 opacity-50">
                  <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-400">🍃</span>
                  </div>
                  <span className="text-xs text-gray-400">Tea Leaf</span>
                </div>
                <div className="flex flex-col items-center space-y-1 opacity-50">
                  <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-400">🫖</span>
                  </div>
                  <span className="text-xs text-gray-400">Tea Pot</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                ✨ Add custom tea-specific icons as needed - best of both worlds!
              </p>
            </div>

            {/* Usage Example */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-700">In Action</h3>
              <div className="space-y-2">
                <Input 
                  label="Tea Origin" 
                  placeholder="Yunnan, China" 
                  leftIcon={<LocationIcon className="w-4 h-4" />}
                />
                <Input 
                  label="Harvest Date" 
                  placeholder="Spring 2023" 
                  leftIcon={<CalendarIcon className="w-4 h-4" />}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Button Demo Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Component Demo: Buttons
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="primary" size="md">Add Tea</Button>
              <Button variant="secondary" size="md">Cancel</Button>
            </div>
            
            <Button variant="primary" size="md" fullWidth loading>
              Saving Tea...
            </Button>
          </div>
        </div>

        {/* Mobile Testing Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📱 Mobile Experience Test
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Test these on your iPhone - 16px+ text prevents zoom, TextAreas resize smoothly!
          </p>
          
          <div className="space-y-4">
            <Input 
              label="Tea Name" 
              placeholder="Dragon Well Green Tea..." 
              leftIcon={<SearchIcon className="w-4 h-4" />}
            />

            <Select
              label="Tea Type"
              placeholder="Select type..."
              options={teaTypes.slice(0, 4)}
              helperText="Try the dropdown - mobile optimized!"
            />

            <TextArea
              label="Quick Tasting Notes"
              placeholder="Sweet, grassy, delicate finish..."
              helperText="Test multi-line input on mobile"
              minRows={2}
              maxRows={4}
            />

            <Rating
              label="Tea Rating"
              helperText="Test slider on mobile"
              maxRating={10}
              size="md"
              showNumbers={false}
            />
            
            <div className="grid grid-cols-2 gap-3">
              <Button variant="primary" size="md">
                ✓ Add Tea
              </Button>
              <Button variant="ghost" size="md">
                🔍 Search
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="text-center text-gray-500 text-sm">
          <p>🎉 UI Component Library Complete!</p>
          <p>🚀 All Components: Button ✅ Input ✅ Icons ✅ Select ✅ TextArea ✅ Slider Rating ✅</p>
          <p>✨ Clean slider design - no more repetitive stars!</p>
          <p>📱 Mobile-optimized sliders with touch-friendly interactions</p>
          <p>Next: Build tea management pages with mock data</p>
        </div>
      </div>
    </div>
  );
}
