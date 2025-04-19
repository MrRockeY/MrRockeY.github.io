import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./ui/select";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { sendOrderEmail } from "../api/sendEmail";

const websiteTypes = [
    { id: "portfolio", label: "Portfolio", price: 1000, timeEstimate: 10 },
    { id: "blog", label: "Blog", price: 1500, timeEstimate: 20 },
    { id: "business", label: "Business", price: 2000, timeEstimate: 28 },
    { id: "ecommerce", label: "E-Commerce", price: 2500, timeEstimate: 28 },
    { id: "custom", label: "Custom Application", price: 3000, timeEstimate: 30 }
];

const features = [
    { id: "contact-form", label: "Contact Form", price: 100, timeEstimate: 1 },
    { id: "payment-integration", label: "Payment Integration", price: 500, timeEstimate: 3 },
    { id: "admin-panel", label: "Admin Panel", price: 800, timeEstimate: 5 },
    { id: "seo-optimization", label: "SEO Optimization", price: 200, timeEstimate: 3 },
    { id: "newsletter", label: "Newsletter Integration", price: 200, timeEstimate: 2 },
    { id: "blog-section", label: "Blog Section", price: 300, timeEstimate: 3 },
    { id: "multilingual", label: "Multi-language Support", price: 400, timeEstimate: 3 },
];

type Step = "websiteType" | "features" | "design" | "budget" | "contact";

export function OrderSection() {
    const { toast } = useToast();
    const [currentStep, setCurrentStep] = useState<Step>("websiteType");
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [selectedTheme, setSelectedTheme] = useState<string>("light");
    const [colorStyle, setColorStyle] = useState<string>("blue");
    const [layout, setLayout] = useState<string>("modern");
    const [budget, setBudget] = useState<string>("");
    const [deadline, setDeadline] = useState<Date | undefined>(undefined);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [timeEstimate, setTimeEstimate] = useState<number>(0);

    const [contactInfo, setContactInfo] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        websiteType: "",
        selectedFeatures: [] as string[],
        theme: "light",
        colorStyle: "blue",
        layout: "modern",
        budget: "",
        deadline: "",
        totalCost: 0,
        estimatedTime: 0,
        additionalMessage: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const updateEstimates = () => {
        let cost = 0;
        let time = 0;

        // Add website type costs
        if (selectedType) {
            const type = websiteTypes.find(t => t.id === selectedType);
            if (type) {
                cost += type.price;
                time += type.timeEstimate;
            }
        }

        // Add feature costs
        selectedFeatures.forEach(featureId => {
            const feature = features.find(f => f.id === featureId);
            if (feature) {
                cost += feature.price;
                time += feature.timeEstimate;
            }
        });

        // Add design complexity costs
        if (layout === "premium") {
            cost += 300;
            time += 5;
        }

        setTotalCost(cost);
        setTimeEstimate(time);
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        updateEstimates();

        switch (currentStep) {
            case "websiteType":
                if (!selectedType) {
                    toast({
                        title: "Please select a website type",
                        variant: "destructive"
                    });
                    return;
                }
                setCurrentStep("features");
                break;
            case "features":
                setCurrentStep("design");
                break;
            case "design":
                setCurrentStep("budget");
                break;
            case "budget":
                if (!budget) {
                    toast({
                        title: "Please enter your budget",
                        variant: "destructive"
                    });
                    return;
                }
                setCurrentStep("contact");
                break;
            case "contact":
                if (!contactInfo.name || !contactInfo.email) {
                    toast({
                        title: "Please fill in your name and email",
                        variant: "destructive"
                    });
                    return;
                }
                // Submit order
                submitOrder();
                break;
        }
    };

    const handlePrevStep = () => {
        switch (currentStep) {
            case "features":
                setCurrentStep("websiteType");
                break;
            case "design":
                setCurrentStep("features");
                break;
            case "budget":
                setCurrentStep("design");
                break;
            case "contact":
                setCurrentStep("budget");
                break;
        }
    };

    const handleFeatureToggle = (featureId: string, checked: boolean) => {
        if (checked) {
            setSelectedFeatures([...selectedFeatures, featureId]);
        } else {
            setSelectedFeatures(selectedFeatures.filter(id => id !== featureId));
        }
    };

    const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContactInfo({
            ...contactInfo,
            [name]: value
        });
    };

    const submitOrder = async () => {
        setIsSubmitting(true);

        try {
            const orderData = {
                name: contactInfo.name,
                email: contactInfo.email,
                phone: contactInfo.phone,
                websiteType: selectedType ? websiteTypes.find(t => t.id === selectedType)?.label : '',
                selectedFeatures: selectedFeatures.map(f => features.find(feature => feature.id === f)?.label || ''),
                theme: selectedTheme,
                colorStyle: colorStyle,
                layout: layout,
                budget: budget,
                deadline: deadline ? format(deadline, "PPP") : 'Not specified',
                totalCost: totalCost,
                estimatedTime: timeEstimate,
                additionalMessage: contactInfo.message
            };

            const response = await sendOrderEmail(orderData);
            if (response.success) {
                toast({
                    title: "Order submitted successfully!",
                    description: "We'll contact you shortly to discuss your project.",
                });
                // Reset all form data
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    websiteType: "",
                    selectedFeatures: [],
                    theme: "light",
                    colorStyle: "blue",
                    layout: "modern",
                    budget: "",
                    deadline: "",
                    totalCost: 0,
                    estimatedTime: 0,
                    additionalMessage: ""
                });
                setSelectedType(null);
                setSelectedFeatures([]);
                setSelectedTheme("light");
                setColorStyle("blue");
                setLayout("modern");
                setBudget("");
                setDeadline(undefined);
                setContactInfo({
                    name: "",
                    email: "",
                    phone: "",
                    message: ""
                });
                setCurrentStep("websiteType");
            } else {
                toast({
                    title: "Failed to submit order",
                    description: "Please try again.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "An error occurred",
                description: "Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const getCurrentStepContent = () => {
        switch (currentStep) {
            case "websiteType":
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Choose Website Type</h3>
                        <p className="text-muted-foreground">Select the type of website you need for your project.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {websiteTypes.map((type) => (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => {
                                        setSelectedType(type.id);
                                        updateEstimates();
                                    }}
                                    className={`flex flex-col p-6 card-glass cursor-pointer border rounded-xl transition-all text-left ${selectedType === type.id
                                        ? 'border-primary neon-shadow'
                                        : 'border-muted hover:border-primary/50'
                                        }`}
                                >
                                    <span className="text-lg font-medium mb-2">{type.label}</span>
                                    <span className="text-muted-foreground text-sm mb-4">Starting from ${type.price}</span>
                                    <span className="text-xs text-muted-foreground">Est. delivery: {type.timeEstimate} days</span>
                                </button>
                            ))}
                        </div>
                    </div>
                );

            case "features":
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Select Features</h3>
                        <p className="text-muted-foreground">Choose the features you want to include in your website.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {features.map((feature) => (
                                <div key={feature.id} className="flex items-start space-x-3 card-glass p-4 rounded-xl border border-muted">
                                    <Checkbox
                                        id={feature.id}
                                        checked={selectedFeatures.includes(feature.id)}
                                        onCheckedChange={(checked) => handleFeatureToggle(feature.id, checked as boolean)}
                                    />
                                    <div className="space-y-1">
                                        <Label
                                            htmlFor={feature.id}
                                            className="text-base font-medium"
                                        >
                                            {feature.label}
                                        </Label>
                                        <p className="text-sm text-muted-foreground">
                                            +${feature.price} • {feature.timeEstimate} day{feature.timeEstimate > 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "design":
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Design Preferences</h3>
                        <p className="text-muted-foreground">Select your preferred design options for your website.</p>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label>Theme</Label>
                                <RadioGroup value={selectedTheme} onValueChange={setSelectedTheme} className="flex space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="light" id="theme-light" />
                                        <Label htmlFor="theme-light">Light</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="dark" id="theme-dark" />
                                        <Label htmlFor="theme-dark">Dark</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="both" id="theme-both" />
                                        <Label htmlFor="theme-both">Both (Switchable)</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-3">
                                <Label>Color Style</Label>
                                <Select value={colorStyle} onValueChange={setColorStyle}>
                                    <SelectTrigger className="w-full sm:w-[240px]">
                                        <SelectValue placeholder="Select color style" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="blue">Blue & Purple</SelectItem>
                                        <SelectItem value="green">Green & Teal</SelectItem>
                                        <SelectItem value="red">Red & Orange</SelectItem>
                                        <SelectItem value="purple">Purple & Pink</SelectItem>
                                        <SelectItem value="monochrome">Monochrome</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3">
                                <Label>Layout Style</Label>
                                <RadioGroup value={layout} onValueChange={setLayout} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <RadioGroupItem value="modern" id="layout-modern" className="peer sr-only" />
                                        <Label
                                            htmlFor="layout-modern"
                                            className="flex flex-col p-4 card-glass cursor-pointer border border-muted rounded-xl peer-data-[state=checked]:border-primary peer-data-[state=checked]:neon-shadow"
                                        >
                                            <span className="font-medium mb-1">Modern</span>
                                            <span className="text-xs text-muted-foreground">Clean, minimalist design</span>
                                        </Label>
                                    </div>
                                    <div className="relative">
                                        <RadioGroupItem value="premium" id="layout-premium" className="peer sr-only" />
                                        <Label
                                            htmlFor="layout-premium"
                                            className="flex flex-col p-4 card-glass cursor-pointer border border-muted rounded-xl peer-data-[state=checked]:border-primary peer-data-[state=checked]:neon-shadow"
                                        >
                                            <span className="font-medium mb-1">Premium</span>
                                            <span className="text-xs text-muted-foreground">Advanced animations & effects (+$500)</span>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                );

            case "budget":
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Budget & Deadline</h3>
                        <p className="text-muted-foreground">Please provide your budget and preferred deadline.</p>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label htmlFor="budget">Your Budget (USD)</Label>
                                <Input
                                    id="budget"
                                    type="text"
                                    placeholder="e.g. $2,500"
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                />
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="deadline">Preferred Deadline</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start text-left font-normal border-input"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={deadline}
                                            onSelect={setDeadline}
                                            initialFocus
                                            disabled={(date) => date < new Date()}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="card-glass p-6 rounded-xl border border-border mt-8">
                                <h4 className="text-lg font-semibold mb-4">Project Estimate</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Estimated Cost:</span>
                                        <span className="font-medium">${totalCost.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Estimated Completion Time:</span>
                                        <span className="font-medium">{timeEstimate} days</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "contact":
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Contact Details</h3>
                        <p className="text-muted-foreground">Please provide your contact information to complete your order.</p>

                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Your name"
                                        value={contactInfo.name}
                                        onChange={handleContactChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email *</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Your email"
                                        value={contactInfo.email}
                                        onChange={handleContactChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone (Optional)</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    placeholder="Your phone number"
                                    value={contactInfo.phone}
                                    onChange={handleContactChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Additional Information (Optional)</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell us more about your project requirements..."
                                    rows={4}
                                    value={contactInfo.message}
                                    onChange={handleContactChange}
                                />
                            </div>
                        </div>

                        <div className="card-glass p-6 rounded-xl border border-border mt-4">
                            <h4 className="text-lg font-semibold mb-4">Order Summary</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Website Type:</span>
                                    <span className="font-medium">
                                        {selectedType && websiteTypes.find(t => t.id === selectedType)?.label}
                                    </span>
                                </div>
                                {selectedFeatures.length > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Features:</span>
                                        <div className="text-right">
                                            {selectedFeatures.map(featureId => (
                                                <div key={featureId} className="font-medium">
                                                    {features.find(f => f.id === featureId)?.label}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Design:</span>
                                    <span className="font-medium">{layout === "modern" ? "Modern" : "Premium"}, {selectedTheme === "both" ? "Light & Dark" : selectedTheme}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Budget:</span>
                                    <span className="font-medium">{budget}</span>
                                </div>
                                {deadline && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Deadline:</span>
                                        <span className="font-medium">{format(deadline, "PPP")}</span>
                                    </div>
                                )}
                                <div className="border-t border-border pt-3 mt-3">
                                    <div className="flex justify-between">
                                        <span className="text-base font-semibold">Total Estimate:</span>
                                        <span className="text-base font-bold">${totalCost.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Estimated Time:</span>
                                        <span className="font-medium">{timeEstimate} days</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await sendOrderEmail(formData);
            if (response.success) {
                toast({
                    title: "Order submitted successfully!",
                    description: "We'll contact you shortly to discuss your project.",
                });
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    websiteType: "",
                    selectedFeatures: [],
                    theme: "light",
                    colorStyle: "blue",
                    layout: "modern",
                    budget: "",
                    deadline: "",
                    totalCost: 0,
                    estimatedTime: 0,
                    additionalMessage: ""
                });
                setSelectedType(null);
                setSelectedFeatures([]);
                setSelectedTheme("light");
                setColorStyle("blue");
                setLayout("modern");
                setBudget("");
                setDeadline(undefined);
                setContactInfo({
                    name: "",
                    email: "",
                    phone: "",
                    message: ""
                });
                setCurrentStep("websiteType");
            } else {
                toast({
                    title: "Failed to submit order",
                    description: "Please try again.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "An error occurred",
                description: "Please try again later.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleWebsiteTypeSelect = (type: string) => {
        setFormData((prev) => ({ ...prev, websiteType: type }));
    };

    return (
        <section id="order" className="py-20">
            <div className="container mx-auto px-4">
                <SectionHeading
                    title="Order Your Website"
                    subtitle="Follow the steps below to create your custom website order."
                />

                <div className="max-w-3xl mx-auto">
                    {/* Progress Steps */}
                    <div className="mb-10">
                        <div className="flex justify-between items-center">
                            {["websiteType", "features", "design", "budget", "contact"].map((step, index) => (
                                <div key={step} className="flex flex-col items-center relative">
                                    <div
                                        className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center z-10",
                                            currentStep === step
                                                ? "bg-primary text-primary-foreground border-2 border-primary animate-glow"
                                                : step === "websiteType" || step === "features" || step === "design" || step === "budget" || step === "contact"
                                                    ? (
                                                        ["websiteType", "features", "design", "budget", "contact"].indexOf(currentStep as string) >=
                                                            ["websiteType", "features", "design", "budget", "contact"].indexOf(step)
                                                            ? "bg-muted border-2 border-primary/50 text-primary"
                                                            : "bg-muted text-muted-foreground border-2 border-muted"
                                                    )
                                                    : "bg-muted text-muted-foreground border-2 border-muted"
                                        )}
                                    >
                                        {index + 1}
                                    </div>
                                    {index < 4 && (
                                        <div
                                            className={cn(
                                                "absolute top-5 w-full h-0.5",
                                                ["websiteType", "features", "design", "budget"].indexOf(currentStep as string) > index
                                                    ? "bg-primary"
                                                    : "bg-muted"
                                            )}
                                            style={{ left: "50%", width: "100%" }}
                                        />
                                    )}
                                    <span className="text-xs mt-2 font-medium">
                                        {step === "websiteType" ? "Type" :
                                            step === "features" ? "Features" :
                                                step === "design" ? "Design" :
                                                    step === "budget" ? "Budget" : "Contact"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card-glass rounded-xl border border-border p-6 md:p-8">
                        <form onSubmit={handleNextStep} className="space-y-6">
                            {getCurrentStepContent()}

                            <div className="flex justify-between mt-8">
                                {currentStep !== "websiteType" ? (
                                    <Button
                                        variant="outline"
                                        className="border-primary hover:bg-primary/10 neon-border"
                                        onClick={handlePrevStep}
                                        type="button"
                                    >
                                        Back
                                    </Button>
                                ) : (
                                    <span></span>
                                )}
                                <Button
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground neon-shadow"
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {currentStep === "contact" ? (isSubmitting ? "Submitting..." : "Submit Order") : "Continue"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
