import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ServiceCategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/customer-dashboard?category=${encodeURIComponent(category?.slug)}`);
  };

  // Define different gradient combinations for each service category
  const getGradientClasses = (categoryId) => {
    const gradients = {
      1: 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500', // Electricians - Electric colors
      2: 'bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500', // Plumbers - Water colors
      3: 'bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500', // House Maids - Home colors
      4: 'bg-gradient-to-br from-emerald-400 via-green-500 to-lime-500', // Cleaners - Fresh colors
      5: 'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500', // Gardeners - Nature colors
      6: 'bg-gradient-to-br from-violet-400 via-purple-500 to-pink-500', // Painters - Artistic colors
    };
    return gradients?.[categoryId] || 'bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500';
  };

  const getIconBgClasses = (categoryId) => {
    const iconBgs = {
      1: 'bg-gradient-to-br from-yellow-100 to-orange-100 group-hover:from-yellow-200 group-hover:to-orange-200', 
      2: 'bg-gradient-to-br from-blue-100 to-cyan-100 group-hover:from-blue-200 group-hover:to-cyan-200',
      3: 'bg-gradient-to-br from-pink-100 to-purple-100 group-hover:from-pink-200 group-hover:to-purple-200',
      4: 'bg-gradient-to-br from-emerald-100 to-green-100 group-hover:from-emerald-200 group-hover:to-green-200',
      5: 'bg-gradient-to-br from-green-100 to-teal-100 group-hover:from-green-200 group-hover:to-teal-200',
      6: 'bg-gradient-to-br from-violet-100 to-pink-100 group-hover:from-violet-200 group-hover:to-pink-200',
    };
    return iconBgs?.[categoryId] || 'bg-gradient-to-br from-indigo-100 to-purple-100 group-hover:from-indigo-200 group-hover:to-purple-200';
  };

  const getIconColorClasses = (categoryId) => {
    const iconColors = {
      1: 'text-orange-600 group-hover:text-orange-700',
      2: 'text-cyan-600 group-hover:text-cyan-700',
      3: 'text-purple-600 group-hover:text-purple-700',
      4: 'text-emerald-600 group-hover:text-emerald-700',
      5: 'text-green-600 group-hover:text-green-700',
      6: 'text-violet-600 group-hover:text-violet-700',
    };
    return iconColors?.[categoryId] || 'text-indigo-600 group-hover:text-indigo-700';
  };

  const getBorderClasses = (categoryId) => {
    const borders = {
      1: 'border-orange-200 hover:border-orange-300',
      2: 'border-cyan-200 hover:border-cyan-300',
      3: 'border-purple-200 hover:border-purple-300',
      4: 'border-emerald-200 hover:border-emerald-300',
      5: 'border-green-200 hover:border-green-300',
      6: 'border-violet-200 hover:border-violet-300',
    };
    return borders?.[categoryId] || 'border-indigo-200 hover:border-indigo-300';
  };

  return (
    <div
      onClick={handleCategoryClick}
      className={`group relative bg-white/80 backdrop-blur-sm border-2 ${getBorderClasses(category?.id)} rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105`}
    >
      {/* Gradient background overlay */}
      <div className={`absolute inset-0 ${getGradientClasses(category?.id)} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
      
      {/* Icon Container */}
      <div className={`relative w-20 h-20 ${getIconBgClasses(category?.id)} rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
        <Icon 
          name={category?.icon} 
          size={36} 
          className={`${getIconColorClasses(category?.id)} group-hover:scale-110 transition-transform duration-300`}
        />
      </div>
      
      {/* Category Info */}
      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-indigo-700 transition-colors duration-300">
        {category?.name}
      </h3>
      <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-3">
        {category?.description}
      </p>
      
      {/* Enhanced Stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
          <Icon name="Users" size={16} className="text-indigo-500" />
          <span className="font-semibold text-gray-700">{category?.providerCount} providers</span>
        </div>
        <div className="flex items-center gap-2 bg-orange-100 px-3 py-2 rounded-lg">
          <Icon name="Star" size={16} className="text-orange-500" />
          <span className="font-semibold text-gray-700">{category?.averageRating}</span>
        </div>
      </div>
      
      {/* Hover Arrow with gradient */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
          <Icon name="ArrowRight" size={20} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default ServiceCategoryCard;